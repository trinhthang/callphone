var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

var contactSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, default: ''},
  phone: {type: String, default: ''},
  relation: {type: String, default: ''},
  avatar: {type: String, default: ''},
  createdDate: {type: Date, default: new Date().toISOString()},
  onlyMe: {type: Boolean, default: false},
  createBy: {type: ObjectId, ref: 'users'}
})

module.exports = mongoose.model('Contact', contactSchema);
