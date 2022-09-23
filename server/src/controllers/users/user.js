const User = require('../../models/users/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async ( req, res, next) => {
  const {email, password, firstName, lastName} = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({email});
  } catch (error) {
    next(new Error('Something is wrong with the server'), 500);
  }

  if (existingUser) {
    return next(
        new Error('This email has already registered in the app'), 401);
  }
  let createdUser;
  try {
    createdUser = new User({
      email,
      password,
      firstName,
      lastName,
    });
    await createdUser.save();
  } catch (error) {
    next(new Error('Something is wrong with the server'), 500);
  }
  if (!createdUser) {
    return next(new Error('Unable to register the user'));
  }

  res.status(200).json(createdUser);
};
const signIn = async (req, res, next) => {
  const {email, password} = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne( {email});
  } catch (error) {
    next(new Error('Something is wrong with the server'), 500);
  }

  if (!existingUser) {
    return next(new Error('User is not found', 401));
  }

  let isValidPassword = false;

  if ( existingUser.password === password) {
    isValidPassword = true;
  }

  if (!isValidPassword) {
    return next(new Error('Invalid credentials'), 401);
  }

  const token = jwt.sign({email: existingUser.email},
      process.env.ACCESS_TOKEN, {expiresIn: '5s'} );

  res.status(200).json({
    'email': existingUser.email,
    'firstName': existingUser.firstName,
    'lastName': existingUser.lastName,
    'id': existingUser._id,
    'token': token,
  });
};

exports.signUp = signUp;
exports.signIn = signIn;
