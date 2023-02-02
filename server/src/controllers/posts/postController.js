const Post = require('../../models/posts/post');
const {validationResult} = require('express-validator');
const {uploadImageToCloud,
  getDateNow,
  convertStrToArray} = require('../../utils/utils');
const User = require('../../models/users/user');
const {createTags, updateTags} = require('../tags/tags');

const createPost = async ( req, res, next)=>{
  const error = validationResult(req.body);
  // const {image} = req.files;
  if (!error.isEmpty()) {
    throw Error('Invalid inputs');
  }

  const {title, body, tags, author} = req.body;
  // validate inputs
  // upload image to cloud
  const imageUrl = await uploadImageToCloud(req.file.path);
  const createdAt = getDateNow();
  const parsedTags = convertStrToArray(tags);
  let createdPost;
  try {
    const uploadContent = await new Post({
      title: title,
      body: body,
      createdAt: createdAt,
      image: imageUrl,
      author: author,
    });
    await uploadContent.save();
    await createTags(parsedTags, uploadContent);
    createdPost = uploadContent;
  } catch (error) {
    throw new Error('unable to upload to server');
  }
  // res.status(200).json({title: title, imageUrl, createdAt, content, author});
  res.status(201).json({createdPost});
};

const editPost = async (req, res, next) => {
  const {title, body, tags} = req.body;
  const {postId} = req.params;
  let imageUrl;
  if ( req.file) {
    imageUrl = await uploadImageToCloud(req.file.path);
  }
  try {
    if (imageUrl) {
      const updatePost = await Post.findByIdAndUpdate(postId, {
        title: title,
        body: body,
        image: imageUrl,
      }).populate('tags');

      const parsedTags = convertStrToArray(tags);
      await updateTags(parsedTags, updatePost);
      await updatePost.save();
    } else {
      const updatePost = await Post.findByIdAndUpdate(postId, {
        title: title,
        body: body,
      }).populate('tags');
      const parsedTags = convertStrToArray(tags);
      await updateTags(parsedTags, updatePost);
      await updatePost.save();
    }
  } catch (error) {
    throw new Error('Unable to update to server', 501);
  }

  return res.status(201).json('succesfully editted the post');
};

const getAllPosts = async (req, res, next) =>{
  let posts = [];

  try {
    posts = await Post.find().populate('author');
  } catch (error) {
    throw error;
  }

  res.status(200).json(posts);
};
const getPostById = async ( req, res, next) => {
  const {postId} = req.params;
  let post;
  try {
    post = await Post.findById(postId)
        .populate('author')
        .populate('tags');
  } catch (err) {
    next(new Error('Something wrong with the server', 500));
  }

  if (!post) {
    return next(new Error( 'Post not found', 401));
  }

  res.status(200).json(post);
};

const deletePostById = async ( req, res, next) => {
  const {postId} = req.params;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (error) {
    next( new Error('Something is wrong with the server', 500));
  }

  if (!post) {
    return next( new Error('Unable to find the post', 401));
  }

  try {
    await post.remove();
  } catch ( error) {
    return next(new Error('Unable to delete post ', 401));
  }

  res.status(200).json({message: 'Post has been deleted'});
};
// save post as a reading list
const savePost = async (req, res, next) => {
  const {actionId, userId} = req.body;
  try {
    await Post.findByIdAndUpdate(actionId,
        {$addToSet: {bookmarked: userId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('Unable to find post', 401));
  }

  try {
    await User.findByIdAndUpdate(userId,
        {$addToSet: {savedPost: actionId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('Unable to find post', 401));
  }

  res.status(201).json('Succesfully bookmarked the post');
};

const unBookmarkedPost = async (req, res, next) => {
  const {actionId, userId} = req.body;
  try {
    await Post.findByIdAndUpdate(actionId,
        {$pull: {bookmarked: userId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('Unable to unbookmark', 401));
  }

  try {
    await User.findByIdAndUpdate(userId,
        {$pull: {savedPost: actionId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('fail to take out from the saved post ', 401));
  }

  res.status(201).json('Succesfully unbookmarked the post');
};
// like a post
const likePost = async (req, res, next) => {
  const {actionId, userId} = req.body;

  try {
    await Post.findByIdAndUpdate(actionId,
        {$addToSet: {likes: userId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('Post doesnt exist', 401));
  }

  try {
    await User.findByIdAndUpdate(userId,
        {$addToSet: {likedPost: actionId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('unable to like the post', 401));
  }


  // if (!post) {
  //   return (new Error('Unable to like the post', 401));
  // } else {
  //   post.likes.push(userId);
  //   await post.save();
  // }
  res.status(201).json('You have liked the post!');
};

const unlikePost = async (req, res, next) => {
  const {actionId, userId} = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(actionId,
        {$pull: {likes: userId}},
        {new: true},
    );
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  // if (post) {
  //   try {
  //     post.likes.pull(userId);
  //     await post.save();
  //   } catch (error) {
  //     return (new Error('Unable to unlike the post', 401));
  //   }
  // }
  res.status(201).json(post + 'removed');
};
exports.getPostById = getPostById;
exports.getAllPosts = getAllPosts;
exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePostById = deletePostById;
exports.savePost = savePost;
exports.unBookmarkedPost = unBookmarkedPost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
