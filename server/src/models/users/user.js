const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  createdAt: {type: Date},
  followedTags: [{type: mongoose.Types.ObjectId, default: null, ref: 'Tag'}],
  profilePicture: {type: String, default: null},
  bio: {type: String, default: null},
  socialLink: [{type: String, default: null, ref: 'Sociallink'}],
  followed: [{type: mongoose.Types.ObjectId, default: null, ref: 'User'}],
  follower: [{type: mongoose.Types.ObjectId, default: null, ref: 'User'}],
  post: [{type: mongoose.Types.ObjectId, default: null, ref: 'Post'}],
  likedPost: [{type: mongoose.Types.ObjectId, default: null, ref: 'Post'}],
  savedPost: [{type: mongoose.Types.ObjectId, default: null, ref: 'Post'}],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
