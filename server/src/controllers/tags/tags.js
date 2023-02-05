const Tags = require('../../models/tags/tags');
const Post = require('../../models/posts/post');

const createTags = async (tags, post) => {
  for (const [i, tag] of tags.entries()) {
    console.log(i);
    const createdTags = await Tags.findOneAndUpdate({name: tag.toLowerCase()},
        {$addToSet: {posts: post._id}},
        {upsert: true, new: true},
    );
    await Post.updateOne(
        {_id: post._id},
        {$addToSet: {tags: createdTags._id}},
    );
  }
};
const removeTags = async (tags, post) => {
  for (const [i, tag] of post.tags.entries()) {
    if (!tags.includes(tag.name)) {
      await Tag.updateOne(
          {_id: post.tags[i]._id},
          {$pull: {posts: post._id}},
      );
      await Post.updateOne(
          {_id: post._id},
          {$pull: {tags: post.tags[i]._id}},
      );
    }
  }
};

const updateTags = (tags, post) => {
  createTags(tags, post);
  removeTags(tags, post);
};

const getTags = async (req, res) => {
  let tags;

  try {
    tags = await Tags.find({});
  } catch (error) {
    throw new Error('Unable to get tags', 501);
  }

  res.status(201).json(tags);
};

exports.updateTags = updateTags;
exports.removeTags = removeTags;
exports.createTags = createTags;
exports.getTags = getTags;
