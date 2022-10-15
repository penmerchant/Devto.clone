/* eslint-disable max-len */
const Post = require('../../models/posts/post');
const Comment = require('../../models/comments/comment');

const createComment = async ( req, res, next) => {
  // get postId, userId(author), parentAuthor, comment
  const {content, author, post} = req.body;
  console.log(req.body);
  // const {parentPost} = req.body;
  let blog;

  try {
    blog = await Post.findById(post);
  } catch (error) {
    next(new Error('Something wrong with the server. ', 500));
  }

  if (!blog) {
    return next( new Error('Found no post', 401));
  }

  let createdComment;
  try {
    // const newCreatedComment = await Comment.findById({parentId: parentId}).populate(createdComment, {path: 'commenterId'});
    createdComment = new Comment({
      content: content,
      author: author,
      post: post,
    });
    // console.log(createdComment);
    await blog.comments.push(createdComment._id);
    await blog.save();
    await createdComment.save();
  } catch (error) {
    return next( new Error('Unable to create a comment', 401));
  }

  res.status(201).json(createdComment);
};

const getAllComments = async ( req, res, next) => {
  const {postId} = req.params;
  // console.log(postId);
  let comment;

  try {
    comment = await Post.findOne({_id: postId}).populate('comments');
    // console.log(comment.populated('comments'));
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  // if (!comment) {
  //   return next(new Error('Unable to find a comment by the post id', 401));
  // }
  console.log(comment);
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
// like a comment
// reply a comment
exports.getAllComments = getAllComments;
exports.createComment = createComment;
exports.deleteAllComments = deleteAllComments;
