const fs = require('node:fs');
const readline = require('readline');
const events = require('events');

module.exports = class LoggingService {
    numberOfLogs = 1000;
    logFileName = "default";
    constructor(numberOfLogs, logFileName) {
        this.numberOfLogs = numberOfLogs;
        this.logFileName = logFileName;
        return this;
    }
  
    /**
     * This is a test url for creating a test log file.
     * 
     * @param {response} res the response object for the http request 
     */
    async createLogs(res) {
        let contents = [];
        let content = "";
        for (let i=0; i<this.numberOfLogs; i++) {
            content = new Date().toLocaleTimeString() + " ----" + i + 
                    " https://localhost/test-url-" + i + "\n";
            await fs.writeFileSync(this.logFileName, content, {flag: 'a'}, err => {
                if (err) {
                    throw err;
                } else {
                    contents.push(content);
                }
            });
        }
        res.write(contents.join(", "));
    }

    async getLogs(req, res) {
        try {
            let searchKeyWord = req.query.searchKeyWord;
            let startIndex = req.query.startIndex;
            let endIndex = req.query.endIndex;
            let rev = req.query.rev;
            const readlineObject = readline.createInterface({
                input: fs.createReadStream(this.logFileName),
                crlfDelay: Infinity
            });
            let count = 0;
            let logs = [];
            new Promise(
                async(resolve, reject)=> {
                    readlineObject.on('line', (line) => {
                        count++;
                        if(this.searchKeyWord && line.includes(searchKeyWord)>=0) {
                            logs.push(line);
                        } else {
                            logs.push(line);
                        }
                    });
                    await events.once(readlineObject, 'close');
                    resolve(logs);
                }
            ).then(logs => {
                let filtered_logs = [];
                let start = null;
                let end = null;
                if(startIndex) {
                    start = parseInt(endIndex) - 1;
                } else {
                    start = logs.length - 1;
                }
                end = start - this.numberOfLogs + 1;

                if(rev && (rev == -1) && startIndex) {
                    start = parseInt(startIndex) + parseInt(this.numberOfLogs);
                    end = parseInt(startIndex) + 1;
                }

                for(let j = start; j >= end; j--) {
                    if(j >= 0 && (j <= (logs.length-1))) {
                        filtered_logs.push(logs[j]);
                    } else {
                        break;
                    }
                }

                return {
                    filtered_logs,
                    start,
                    end
                }; 
            }).then((response_data)=> {
                let response = {
                    'data': {
                        'total_rows': count,
                        'logs': response_data.filtered_logs,
                        'start': response_data.start,
                        'end': response_data.end
                    }
                };
                res.send(response);
            });
        } catch (err) {
            console.error(err);
        }
    }
}