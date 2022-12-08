const express = require('express');
const {createComment,
  getAllComments,
  deleteAllComments} = require('../../controllers/comments/comments');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../../middleware/file-upload');

router.post('/', upload.none(), createComment);
router.get('/:postId', getAllComments);
// router.get('/', getAllComments);
router.delete('/:commentId/:postId', deleteAllComments);

module.exports = router;
