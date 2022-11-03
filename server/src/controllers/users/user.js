const User = require('../../models/users/user');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {uploadImageToCloud} = require('../../utils/utils');
require('dotenv').config();

const signUp = async ( req, res, next) => {
  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    throw new Error('Invalid input', 401);
  }

  const {email, password, firstName, lastName} = req.body;

  let existingUser;
  console.log(req.body);
  try {
    existingUser = await User.findOne({email});
  } catch (error) {
    next(new Error('Something is wrong with the server'), 500);
  }

  if (existingUser) {
    throw new Error('This email has already registered in the app', 401);
  }
  const profilePicture = await uploadImageToCloud(req.file.path);
  let createdUser;
  try {
    createdUser = new User({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      profilePicture: profilePicture,
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
  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    throw new Error('Invalid inputs', 401);
  }

  const {email, password} = req.body;
  console.log(req.body);
  let existingUser;

  try {
    existingUser = await User.findOne({email});
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
      process.env.ACCESS_TOKEN, {expiresIn: '1hr'} );

  res.status(200).json({
    'email': existingUser.email,
    'firstName': existingUser.firstName,
    'lastName': existingUser.lastName,
    'id': existingUser._id,
    'profilePicture': existingUser.profilePicture,
    'token': token,
  });
};

const getUserById = async (req, res, next) => {
  const {userId} = req.params;
  let searchedUser;
  try {
    searchedUser = await User.findById(userId);
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  if (!searchedUser) {
    return new Error('Unable to find the user', 401);
  }

  res.status(201).json(searchedUser);
};
// follow a user
// unfollow a user
exports.signUp = signUp;
exports.signIn = signIn;
exports.getUserById = getUserById;
