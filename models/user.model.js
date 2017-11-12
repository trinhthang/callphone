const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

const SALT_ROUND = 10;
const defaultAvtPath = '../public/avatars/avatar_default.jpg';


const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, unique: true, match: [/^[0-9\-\+]{9,15}$/, 'Please fill valid phone']},
    email: {
        type: String, lowercase: true, trim: true, unique: true, default: '',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    avatar: {data: Buffer, contentType: String},
    createDate: {type: Date, default: Date.now}
})

UserSchema.index({username: "text", phone: "text", email: "text"});

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