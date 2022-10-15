const express = require('express');
const {createComment,
  getAllComments,
  deleteAllComments} = require('../../controllers/comments/comments');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getAllComments);
// router.get('/', getAllComments);
router.delete('/:commentId/:postId', deleteAllComments);

module.exports = router;
