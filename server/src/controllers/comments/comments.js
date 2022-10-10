/* eslint-disable max-len */
const Post = require('../../models/posts/post');
const Comment = require('../../models/comments/comment');

const createComment = async ( req, res, next) => {
  const {content, commenterId, parentPost, parentId} = req.body;
  // const {parentPost} = req.body;
  let post;

  try {
    post = await Post.findById(parentPost);
  } catch (error) {
    next(new Error('Something wrong with the server. ', 500));
  }

  if (!post) {
    return next( new Error('No comment found by an id', 401));
  }

  const createdComment = new Comment({
    content,
    commenterId,
    parentPost,
    parentId,
  });

  try {
    // const newCreatedComment = await Comment.findById({parentId: parentId}).populate(createdComment, {path: 'commenterId'});
    console.log(createdComment);
    await createdComment.save();
    post.comments.push(createdComment);
    // console.log(post);
    await post.save();
  } catch (error) {
    return next( new Error('Unable to create a comment', 401));
  }

  res.status(201).json(createdComment);
};

const getCommentById = async ( req, res, next) => {
  const {postId} = req.params;

  let comment;

  try {
    comment = await Comment.findById({parentPost: postId}).populate('parentPost');
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  if (!comment) {
    return next(new Error('Unable to find a comment by the post id', 401));
  }

  res.status(200).json(comment);
};

const deleteAllComments = async ( req, res, next) => {
  const {commentId, postId} = req.params;
  let comments;
  let post;
  try {
    comments = await Comment.findById(commentId);
    post = await Post.findById(postId);
  } catch (error) {
    next( new Error('Something is wrong with the server', 500));
  }

  if (!comments) {
    return next( new Error('no comment found'), 401);
  }
  console.log(comments);
  try {
    await comments.remove();
    await post.Comments.reduce();
  } catch (error) {
    return next( new Error('Unable to delele all of the comments'), 401);
  }

  res.status(200).json('Succesfully deleted comments');
};
// comment on a post
// like a comment
// reply a comment
exports.getCommentById = getCommentById;
exports.createComment = createComment;
exports.deleteAllComments = deleteAllComments;
