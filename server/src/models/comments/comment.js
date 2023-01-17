const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {type: String},
  parentComment: {type: mongoose.Types.ObjectId, ref: 'Comment', default: null},
  createdAt: {type: Date},
  author: {type: mongoose.Types.ObjectId, ref: 'User'},
  post: {type: mongoose.Types.ObjectId, ref: 'Post'},
  replies: [{type: mongoose.Types.ObjectId, ref: 'Comment', default: null}],
  likes: [{type: mongoose.Types.ObjectId, ref: 'User', default: null}],
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
