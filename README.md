# monitoring-service
# Installation:
1. Clone the repository using git clone. 
2. Setup npm and nodejs. Run npm install. For windows try to use git bash to run all commands.
3. Run the nodejs service using node app.js command in the project directory.
4. The service should be deployed on http://localhost:3000/
# Available APIs 
1. Create Logs API: http://localhost:3000/logs/createLogs?logFileName=abc&numberOfLogs=1000
   API to create test data in a sample log file.
   Parameters: logFileName, numberOfLogs.
   This API appends the numberOfLogs logs to the end of the file, even if the file already exists.
2. Get Logs API: http://localhost:3000/logs/createLogs?logFileName=abc&numberOfLogs=1000&startIndex=1000&endIndex=901&rev=-1
    API to get logs from a given log file located in /var/logs/
    Parameters: logFileName, numberOfLogs, startIndex, endIndex, rev. Here startIndex>endIndex, since we are getting the last logs first. This call returns logs before endIndex. Rev can be set to -1 to return logs after startIndex
    Parameters for the first call: logFileName, numberOfLogs. This call returns numberOfLogs logs from the end of the file. 