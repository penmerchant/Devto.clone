const cloudinary = require('../config/cloudinary');

const uploadImageToCloud = async (image) =>{
  let uploadedImage;

  try {
    uploadedImage = await cloudinary.uploader.upload(image);
  } catch (error) {
    throw Error('Unable to upload image to cloud', 401);
  }

  const url = uploadedImage.url;

  return url;
};

const getDateNow = () =>{
  const dateNow = Date();
  return dateNow;
};


exports.uploadImageToCloud = uploadImageToCloud;
exports.getDateNow = getDateNow;

