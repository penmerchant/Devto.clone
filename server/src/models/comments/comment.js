const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  commenterId: {type: mongoose.Types.ObjectId, ref: 'User'},
  parentPost: {type: mongoose.Types.ObjectId, ref: 'Post'},
  parentId: {type: mongoose.Types.ObjectId, ref: 'Comment', default: null},
  likedBy: [{type: mongoose.Types.ObjectId, ref: 'User', default: null}],
});

// const CommentSchema = new Schema({
//   content: String,
//   commenterId: {type: mongoose.Types.ObjectId, ref: 'User'},
//   parentPost: String,
//   likedBy: [{type: mongoose.Types.ObjectId, ref: 'User'}],
//   parentId: String,
// });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
