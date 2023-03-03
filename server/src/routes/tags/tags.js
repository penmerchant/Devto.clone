const express = require('express');
const {getTags,
  followTag,
  unfollowTag,
  getFollowedTagsPost,
  getAllTagsPost} = require('../../controllers/tags/tags');
const router = express();

router.get('/', getTags);
router.put('/follow', followTag);
router.put('/unfollow', unfollowTag);
router.get('/tag-related-post/:userId', getFollowedTagsPost);
router.get('/tags-related-post', getAllTagsPost);

module.exports = router;
