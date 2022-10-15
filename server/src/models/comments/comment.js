const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {type: String},
  parentComment: {type: mongoose.Types.ObjectId, ref: 'Comment', default: null},
  author: {type: mongoose.Types.ObjectId, ref: 'User'},
  post: {type: mongoose.Types.ObjectId, ref: 'Post'},
  likedBy: [{type: mongoose.Types.ObjectId, ref: 'User', default: null}],
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
