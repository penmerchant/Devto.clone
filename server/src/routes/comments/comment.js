const express = require('express');
const {createComment,
  getAllComments,
  deleteAllComments,
  likeComment,
  unlikeComment} = require('../../controllers/comments/comments');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../../middleware/file-upload');

router.post('/', upload.none(), createComment);
router.get('/:postId', getAllComments);
// router.get('/', getAllComments);
router.delete('/:commentId/:postId', deleteAllComments);
router.put('/like/', likeComment);
router.put('/unlike/', unlikeComment);

module.exports = router;
