const Tags = require('../../models/tags/tags');
const Post = require('../../models/posts/post');
const User = require('../../models/users/user');
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


const followTag = async (req, res) => {
  const {userId, targetId} = req.body;
  try {
    await Tags.findByIdAndUpdate({_id: targetId}, {$push: {followers: userId}});
    await User.updateOne({_id: userId},
        {$push: {followedTags: targetId}});
  } catch (error) {
    throw new Error('Unable to follow the tag', 501);
  }

  res.status(201).json('Sucessfully followed the tag');
};

const unfollowTag = async (req, res) => {
  const {userId, targetId} = req.body;
  try {
    await Tags.findByIdAndUpdate({_id: targetId}, {$pull: {followers: userId}});
    await User.updateOne({_id: userId}, {
      $pull: {followedTags: targetId},
    });
  } catch (error) {
    throw new Error('Unable to unfollow the tag', 501);
  }

  res.status(201).json('Successfully unfollowed the tag');
};

const getFollowedTagsPost = async (req, res) => {
  const {userId} = req.params;

  let taggedPosts = [];

  try {
    taggedPosts = await Tags.find({}).where('followers').equals(userId)
        .populate({path: 'posts',
          options: {limit: 5},
          populate: [{
            path: 'comments',
          }],
        });
  } catch (error) {
    return new Error('Unable to retrieve posts', 501);
  }
  res.status(201).json(taggedPosts);
};

const getAllTagsPost = async (req, res) => {
  let taggedPosts = [];
  try {
    taggedPosts = await Tags.find({}).populate({path: 'posts',
      options: {limit: 5},
      populate: [{
        path: 'comments',
      }],
    }).limit(10);
  } catch (error) {
    return new Error('Unable to retrieve tag related post', 501);
  }

  res. status(201).json(taggedPosts);
};

exports.getAllTagsPost = getAllTagsPost;
exports.getFollowedTagsPost = getFollowedTagsPost;
exports.unfollowTag = unfollowTag;
exports.followTag = followTag;
exports.updateTags = updateTags;
exports.removeTags = removeTags;
exports.createTags = createTags;
exports.getTags = getTags;
