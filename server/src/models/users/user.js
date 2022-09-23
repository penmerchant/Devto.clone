const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  bio: {type: String, default: null},
  socialLink: [{type: String, default: null, ref: 'Sociallink'}],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
