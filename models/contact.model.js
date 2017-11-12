const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let ContactSchema = new Schema({
    name: {type: String, default: '', unique: true},
    phoneContact: {type: String, unique: true, match: [/^[0-9\-\+]{9,15}$/, 'Please fill valid phone']},
    //picture: {type: String, default: ''},
    createDate: {type: Date, default: Date.now},
    accessLevel: {type: Number, default: 1},//1: only me, 2: person in my contact, 3: public
    createByUser: {type: ObjectId, ref: 'User', default: null}
})

UserSchema.index({name: "text", phoneContact: "text"});


module.exports = mongoose.model('Contact', ContactSchema);