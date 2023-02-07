const express = require('express');
const {getTags,
  followTag,
  unfollowTag} = require('../../controllers/tags/tags');
const router = express();

router.get('/', getTags);
router.put('/follow', followTag);
router.put('/unfollow', unfollowTag);
module.exports = router;
