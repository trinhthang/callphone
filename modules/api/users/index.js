const express = require('express');
const Router = express.Router();

var userController = require('./userController');

Router.post('/signup', (req, res) => {
  var userInfor = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    tel: req.body.tel
  }

  console.log("post user data: ", req.body);

  userController.createUser(userInfo, (err, doc) => {
    if (err){
      console.log(err);
      res.send("Create User Fail");
    } else {
      res.send("Created User");
    }
  })
})

module.exports = Router;
