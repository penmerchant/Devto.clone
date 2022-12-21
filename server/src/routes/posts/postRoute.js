/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  likePost,
  unlikePost,
  savePost,
} = require('../../controllers/posts/postController');
const upload = require('../../middleware/file-upload');

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
// router.delete('/:postId', deletePostById);
router.delete('/:postId', deletePostById);
// like a post
router.put('/likes/', likePost);
router.put('/bookmarks/', savePost);
router.put('/unlike/', unlikePost);
module.exports = router;
