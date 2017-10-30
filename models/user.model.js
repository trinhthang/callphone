const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, unique: true, match: [/^[0-9\-\+]{9,15}$/, 'Please fill valid phone']},
    email: {type: String, lowercase: true, default: ''},
    //avatar: {type: String, default: ''},
    createDate: {type: Date, default: Date.now}
})

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_ROUND, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

module.exports = mongoose.model('User', UserSchema);