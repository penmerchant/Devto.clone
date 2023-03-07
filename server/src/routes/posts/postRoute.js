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
  unBookmarkedPost,
  editPost,
  searchPostByTag,
  searchPostsByKeyword,
} = require('../../controllers/posts/postController');
const upload = require('../../middleware/file-upload');

router.post('/', upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.get('/tag-search/:tagId', searchPostByTag);
router.get('/search-post/:keyword', searchPostsByKeyword);
router.delete('/delete/', deletePostById);
router.put('/like/', likePost);
router.put('/bookmark/', savePost);
router.put('/unBookmark/', unBookmarkedPost);
router.put('/unlike/', unlikePost);
router.put('/edit-post/:postId', upload.single('image'), editPost);

module.exports = router;
