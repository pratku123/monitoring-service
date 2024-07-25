const express = require('express')
const logsRouter = require('./routes/logs')
const app = express()
const port = 3000
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/logs', logsRouter);



let onStart = () => {
  console.log(`Example app listening on port ${port}`)
};

app.listen(port, onStart);



module.exports = app;