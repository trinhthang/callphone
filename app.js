const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const bodyParser = require('body-parser');

let app = express();

const userRouter = require('./routes/user.route');
const contactRouter = require('./routes/contact.route');

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);

mongoose.Promise = global.Promise;
let promise = mongoose.connect(config.mongoConnection, {
  useMongoClient: true
});

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
});
