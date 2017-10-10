const mongoose = require('mongoose');
const userModel = require('./userModel');

var createUser = (data, callback) => {
  userModel.findOne({}).sort({ id:1 }).exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      var id;
      if (doc && doc.id) {
        id = doc.id + 1;
      } else {
        id = 1;
      }
      userModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log("Created User:" + doc);
          callback(null, doc);
        }
      })
    }
  })
}

var getAllUser = (callback) => {

}

var configInfoUser = (data, callback) => {

}

var searchUserByNamePhoneEmail = (searchString, callback) => {

}

module.exports = {
  createUser,
  getAllUser,
  configInfoUser,
  searchUserByNamePhoneEmail
}
