/* eslint-disable max-len */
const Post = require('../../models/posts/post');
const Comment = require('../../models/comments/comment');
const User = require('../../models/users/user');
const {getDateNow} = require('../../utils/utils');

const createComment = async ( req, res, next) => {
  // get postId, userId(author), parentAuthor, comment
  const {comment, parentComment, author, post} = req.body;
  const createdAt = getDateNow();

  // const {comment, author, post} = req.body;
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
        createdAt: createdAt,
        post: post,
      });
    } else {
      createdComment = new Comment({
        comment: comment,
        author: author,
        post: post,
        createdAt: createdAt,
      });
    }
    await createdComment.save();
  } catch (error) {
    return next(new Error('Unable to create a comment', 501));
  }
  // if user replies to any user's comments of viewed blog
  if (existingComment) {
    existingComment.replies.push(createdComment._id);
    existingComment.save();
  } else {
    await blog.comments.push(createdComment._id);
    await blog.save();
  }
  await User.updateOne({_id: author}, {
    $addToSet: {comments: createdComment._id},
  });

  res.status(201).json(createdComment);
};

const getAllComments = async ( req, res, next) => {
  const {postId} = req.params;
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
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  if (!comment) {
    return next(new Error('Unable to find a comment by the post id', 401));
  }
  const {comments} = comment;
  res.status(200).json(comments);
};

const deleteCommentById = async ( req, res, next) => {
  const {commentId, userId} = req.body;
  const comment = await Comment.findById(commentId);
  try {
    await Post.updateOne({_id: comment.post}, {$pull: {comments: commentId}});
    await User.updateOne({_id: userId}, {$pull: {comments: commentId}});
    await Comment.deleteOne({_id: commentId});
  } catch (error) {
    next( new Error('Unable to delete comment', 500));
  }

  res.status(200).json('Succesfully deleted comments');
};
// like a comment
const likeComment = async (req, res, next) =>{
  const {actionId, userId} = req.body;

  try {
    await Comment.findByIdAndUpdate(actionId,
        {$addToSet: {likes: userId}},
        {new: true},
    );
  } catch (error) {
    return next(new Error('Post doesnt exist', 401));
  }

  res.status(201).json('You have liked a comment');
};

const unlikeComment = async (req, res, next) => {
  const {actionId, userId} = req.body;
  try {
    await Comment.findByIdAndUpdate(actionId,
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
  res.status(201).json('You have unliked a comment');
};

const getCommentById = async (req, res) => {
  const {commentId} = req.params;
  let comment;

  try {
    comment = await Comment.findById(commentId);
  } catch (error) {
    return new Error('Unable to find a comment by id', 501);
  }

  res.status(201).json(comment);
};

const editComment = async (req, res) => {
  const {commentId, userId, newComment} = req.body;

  try {
    await Comment.updateOne({_id: commentId, author: userId}, {
      comment: newComment,
    });
  } catch (error) {
    return new Error('Unable to update a comment', 501);
  }
  res. status(201).json('Successfully update a comment');
};
// reply a comment
exports.editComment = editComment;
exports.getCommentById = getCommentById;
exports.getAllComments = getAllComments;
exports.createComment = createComment;
exports.deleteCommentById = deleteCommentById;
exports.likeComment = likeComment;
exports.unlikeComment = unlikeComment;
