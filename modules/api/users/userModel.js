var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  email: {type: String, unique: true},
  avatar: {type: String, default: ''},
  createdDate: {type: Date, default: new Date().toISOString()}
})

userSchema.pre('save', function (next) {
  var user = this;
  console.log("this is user", user);

  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    })
  })
})

module.exports = mongoose.model('User', userSchema);
