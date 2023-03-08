const express = require('express');
const {signIn,
  signUp,
  getUserById,
  followUser,
  getRecentPosts,
  getRecentComments,
  editProfile,
  getSavedPost,
  unfollow} = require('../../controllers/users/user');

const router = new express.Router();
const upload = require('../../middleware/file-upload');

router.post('/login', signIn);
router.put('/follow/:userId/:authorId', followUser);
router.put('/unfollow/:userId/:authorId', unfollow);
router.post('/register', upload.single('image'), signUp);
router.get('/:userId', getUserById);
router.get('/recentPosts/:userId', getRecentPosts);
router.get('/recentComments/:userId', getRecentComments);
router.get('/saved-posts/:userId', getSavedPost);
router.put('/edit-profile/:userId', upload.single('profilePicture'),
    editProfile);
module.exports = router;
