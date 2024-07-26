const router = require('express').Router();
const logsController = require('../controllers/logsController');

//Endpoint to get logs from a given file name.
router.get('/get', logsController.getLogs);

//Testing endpoint to create logs in a sample log file.
router.get('/create', logsController.createLogs);

module.exports = router;