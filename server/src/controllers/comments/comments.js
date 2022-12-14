/* eslint-disable max-len */
const Post = require('../../models/posts/post');
const Comment = require('../../models/comments/comment');

const createComment = async ( req, res, next) => {
  // get postId, userId(author), parentAuthor, comment
  const {comment, parentComment, author, post} = req.body;
  // const {comment, author, post} = req.body;
  console.log(req.body);
  let blog;

  try {
    blog = await Post.findById(post);
  } catch (error) {
    next(new Error('Something wrong with the server. ', 500));
  }

  if (!blog) {
    return next(new Error('Found no post', 401));
  }

  let existingComment;
  // try to find the parentComment
  // console.log(parentComment);
  if (parentComment !== 'null') {
    existingComment = await Comment.findOne({_id: parentComment});
  }
  let createdComment;
  try {
    if (parentComment !== 'null') {
      createdComment = new Comment({
        comment: comment,
        parentComment: parentComment,
        author: author,
        post: post,
      });
    } else {
      createdComment = new Comment({
        comment: comment,
        author: author,
        post: post,
      });
    }
    await createdComment.save();
  } catch (error) {
    return next(new Error('Unable to create a comment', 401));
  }
  // if user replies to any user's comments of viewed blog
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
    comment = await Post.findById(postId).populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: [{
        path: 'author',
      },
      {
        path: 'replies',
        populate: 'author',
      },
      ],
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
