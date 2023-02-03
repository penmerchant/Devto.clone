const User = require('../../models/users/user');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {uploadImageToCloud} = require('../../utils/utils');
const {getDateNow} = require('../../utils/utils');
require('dotenv').config();

const signUp = async ( req, res, next) => {
  const error = validationResult(req.body);

  if (!error.isEmpty()) {
    throw new Error('Invalid input', 401);
  }

  const {email, password, firstName, lastName} = req.body;
  const createdAt= getDateNow();

  let existingUser;
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
      createdAt: createdAt,
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
    searchedUser = await User.findById(userId).select('-password');
  } catch (error) {
    next(new Error('Something is wrong with the server', 500));
  }

  if (!searchedUser) {
    return new Error('Unable to find the user', 401);
  }

  res.status(201).json(searchedUser);
};
// follow a user
const followUser = async (req, res, next) => {
  const {userId, authorId} = req.params;
  let currentUser;

  try {
    currentUser = await User.findById(userId);
  } catch (error) {
    return next( Error('This user is not exist'), 401);
  }

  let followedUser;
  try {
    followedUser = await User.findById(authorId);
  } catch (error) {
    return next( Error('This user is not exist'), 401);
  }

  if (currentUser && followedUser) {
    try {
      await currentUser.followed.push(followedUser._id);
      await followedUser.follower.push(currentUser._id);
      await followedUser.save();
      await currentUser.save();
    } catch (error) {
      return next(new Error('Unable to follow the user'), 401);
    }
  }

  res.status(201).json('Operation is succeded');
};

const getRecentComments = async (req, res, next) => {
  const {userId} = req.params;

  let searchedUser;

  try {
    searchedUser = await User.findById(userId);
  } catch (error) {
    return new Error('User is not found', 401);
  }

  let recentComments = [];

  if (searchedUser) {
    // populate: [{
    //   path: 'author',
    // },
    recentComments = await searchedUser.populate({path: 'comments',
      populate: [{
        path: 'post',
      }],
    });
  }

  return res.status(201).json(recentComments);
};

const getRecentPosts = async (req, res, next) => {
  const {userId} = req.params;

  let searchedUser;

  try {
    searchedUser = await User.findById(userId);
  } catch (error) {
    return new Error('User is not found', 401);
  }

  let recentPosts = [];

  if (searchedUser) {
    recentPosts = await searchedUser.populate('post');
  }

  return res.status(201).json(recentPosts);
};

const editProfile = async (req, res, next) => {
  const {userId} = req.params;
  const {firstName, lastName, bio, github, instagram} = req.body;

  let imageUrl;
  if ( req.file ) {
    imageUrl = await uploadImageToCloud(req.file.path);
  }

  try {
    if ( imageUrl) {
      await User.findByIdAndUpdate(userId, {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        profilePicture: imageUrl,
        github: github,
        instagram: instagram,
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        github: github,
        instagram: instagram,
      });
    }
  } catch (error) {
    throw new Error('Unable to update user profile', 501);
  }


  res.status(201).json('Sucessfully updated user profile');
};
// unfollow a user
exports.followUser = followUser;
exports.signUp = signUp;
exports.signIn = signIn;
exports.getUserById = getUserById;
exports.getRecentComments = getRecentComments;
exports.getRecentPosts = getRecentPosts;
exports.editProfile = editProfile;
