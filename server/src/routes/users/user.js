const express = require('express');
const {signIn,
  signUp,
  getUserById,
  followUser,
  getRecentPosts,
  getRecentComments} = require('../../controllers/users/user');

const router = new express.Router();
const upload = require('../../middleware/file-upload');

router.post('/login', signIn);
router.post('/:userId/:authorId', followUser);
router.post('/register', upload.single('image'), signUp);
router.get('/:userId', getUserById);
router.get('/recentPosts/:userId', getRecentPosts);
router.get('/recentComments/:userId', getRecentComments);
module.exports = router;
