const express = require('express');
const {signIn, signUp, getUserById} = require('../../controllers/users/user');
const router = new express.Router();

router.post('/login', signIn);
router.post('/register', signUp);
router.get('/:userId', getUserById);

module.exports = router;
