const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

let promise = mongoose.connect(config.mongoConnection, {
  useMongoClient: true
});

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
});
