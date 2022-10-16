/* eslint-disable max-len */
const Post = require('../../models/posts/post');
const Comment = require('../../models/comments/comment');

const createComment = async ( req, res, next) => {
  // get postId, userId(author), parentAuthor, comment
  const {content, parentComment, author, post} = req.body;
  // const {content, author, post} = req.body;
  console.log(parentComment);
  let blog;

  try {
    blog = await Post.findById(post);
  } catch (error) {
    next(new Error('Something wrong with the server. ', 500));
  }

  if (!blog) {
    return next( new Error('Found no post', 401));
  }

  let existingComment;
  if (parentComment) {
    // try to find the parentComment
    try {
      console.log(parentComment);
      existingComment = await Comment.findOne({_id: parentComment});
      console.log(existingComment);
    } catch (error) {
      return (new Error('Comment does not exist!', 401));
    }
  }

  let createdComment;
  try {
    createdComment = new Comment({
      content: content,
      parentComment: parentComment,
      author: author,
      post: post,
    });
    await createdComment.save();
  } catch (error) {
    return next( new Error('Unable to create a comment', 401));
  }
  // if user does not reply to any user's comments of viewed blog
  if (existingComment) {
    existingComment.replies.push(createdComment._id);
    existingComment.save();
  } else {
    await blog.comments.push(createdComment._id);
    await blog.save();
  }
  // const {comments} = createdComment;
  // res.status(201).json(comments);
  res.status(201).json(createdComment);
};

const getAllComments = async ( req, res, next) => {
  const {postId} = req.params;
  // console.log(postId);
  let comment;

  try {
    comment = await Post.findOne({_id: postId}).populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: {path: 'replies'},
    });
    // console.log(comment.populated('comments'));
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  if (!comment) {
    return next(new Error('Unable to find a comment by the post id', 401));
  }
  const {comments} = comment;
  res.status(200).json(comments);
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
    await post.comments.reduce();
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
