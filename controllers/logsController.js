const asyncHandler = require("express-async-handler");
const LoggingService = require('../services/loggingService.js');
const logFileErrorMessage = "Log file name is required";

//get logs from a given file name
exports.getLogs = asyncHandler(async (req, res, next) => {
    const logFileName = './var/log/'+req.query.logFileName;
    const numberOfLogs = req.query.numberOfLogs;
    const searchKeyWord = req.query.searchKeyWord;
    if(!req.query.logFileName) {
        res.send(logFileErrorMessage);
        throw new Error(logFileErrorMessage);
    }
    const loggingService = new LoggingService(numberOfLogs, logFileName);
    loggingService.getLogs(req, res);
    req.on('close', ()=> {
        console.log('http connection closed');
    })
});

//URL for creating test data
exports.createLogs = asyncHandler(async (req, res, next) => {
    const numberOfLogs = req.query.numberOfLogs;
    const logFileName = './var/log/'+req.query.logFileName;
    if(!numberOfLogs || !logFileName) {
        throw new Error("numberOfLogs and logFileName are required");
    }
    const loggingService = new LoggingService(numberOfLogs, logFileName);
    const response = loggingService.createLogs(res);  
    res.end();  
});