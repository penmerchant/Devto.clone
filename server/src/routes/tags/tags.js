const express = require('express');
const {getTags} = require('../../controllers/tags/tags');
const router = express();

router.get('/', getTags);

module.exports = router;
