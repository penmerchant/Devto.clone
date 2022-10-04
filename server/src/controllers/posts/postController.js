const Post = require('../../models/posts/post');
const {validationResult} = require('express-validator');
const {uploadImageToCloud, getDateNow} = require('../../utils/utils');

const createPost = async ( req, res, next)=>{
  const error = validationResult(req.body);
  // const {image} = req.files;
  // console.log(`hi ${image}`);
  console.log(req.body);
  if (!error.isEmpty()) {
    throw Error('Invalid inputs');
  }

  const {title, body, tags, author} = req.body;
  // validate inputs
  // upload image to cloud
  const imageUrl = await uploadImageToCloud(req.file.path);
  const createdAt = getDateNow();
  let createdPost;
  try {
    const uploadContent = await new Post({
      title: title,
      body: body,
      createdAt: createdAt,
      imageUrl: imageUrl,
      author: author,
      tags: tags,
    });
    await uploadContent.save();
    createdPost = uploadContent;
  } catch (error) {
    throw new Error('unable to upload to server');
  }
  // res.status(200).json({title: title, imageUrl, createdAt, content, author});
  res.status(201).json({createdPost});
};

const getAllPosts = async (req, res, next) =>{
  let posts = [];

  try {
    posts = await Post.find();
  } catch (error) {
    throw error;
  }

  res.status(200).json(posts);
};
const getPostById = async ( req, res, next) => {
  const {postId} = req.params;
  let post;
  try {
    post = await Post.findById(postId);
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

exports.getPostById = getPostById;
exports.getAllPosts = getAllPosts;
exports.createPost = createPost;
exports.deletePostById = deletePostById;
