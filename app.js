const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');


const userRouter = require(__dirname + '/modules/api/users/');

var app = express();

app.use('/api/users', userRouter);

var promise = mongoose.connect(config.connectionString, {
  useMongoClient: true
})

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
})
