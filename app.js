const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const bodyParser = require('body-parser');

const userRouter = require(__dirname + '/modules/api/users/');

var app = express();

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/api/users', userRouter);

var promise = mongoose.connect(config.connectionString, {
  useMongoClient: true
})

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
})
