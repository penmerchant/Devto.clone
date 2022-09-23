const express = require('express');
const {signIn, signUp} = require('../../controllers/users/user');
const router = new express.Router();

router.post('/login', signIn);
router.post('/register', signUp);

module.exports = router;
