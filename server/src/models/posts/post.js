const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {type: String},
  body: {type: String},
  createdAt: {type: String},
  imageUrl: {type: String},
  author: {type: mongoose.Types.ObjectId},
  comments: [{type: mongoose.Types.ObjectId, ref: 'Comment', default: null}],
  tags: [{type: String, ref: 'Tag', default: null}],
  likes: [{type: mongoose.Types.ObjectId, ref: 'User', default: null}],
});

const Postschema = mongoose.model('Post', Post);

module.exports = Postschema;

