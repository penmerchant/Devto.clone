const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  tag: {type: String},
  description: {type: String},
});

const Tags = mongoose.model('Tags', TagsSchema);
module.exports = Tags;
