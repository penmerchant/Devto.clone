const express = require('express');
const {createComment,
  getCommentById,
  deleteAllComments} = require('../../controllers/comments/comments');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getCommentById);
router.delete('/:commentId/:postId', deleteAllComments);

module.exports = router;
