const express = require('express');
const {createComment,
  getAllComments,
  likeComment,
  unlikeComment,
  deleteCommentById} = require('../../controllers/comments/comments');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../../middleware/file-upload');

router.post('/', upload.none(), createComment);
router.get('/:postId', getAllComments);
// router.get('/', getAllComments);
router.delete('/delete', deleteCommentById);
router.put('/like/', likeComment);
router.put('/unlike/', unlikeComment);

module.exports = router;
