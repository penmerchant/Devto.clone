const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  name: {type: String},
  createdAt: {type: Date, default: Date.now()},
  followers: [{type: mongoose.Types.ObjectId, default: [], ref: 'User'}],
  posts: [{type: mongoose.Types.ObjectId, default: [], ref: 'Post'}],
});

const Tags = mongoose.model('Tags', TagsSchema);
module.exports = Tags;
