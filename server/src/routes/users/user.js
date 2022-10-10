const express = require('express');
const {signIn, signUp, getUserById} = require('../../controllers/users/user');
const router = new express.Router();
const upload = require('../../middleware/file-upload');

router.post('/login', signIn);
router.post('/register', upload.single('image'), signUp);
router.get('/:userId', getUserById);

module.exports = router;
