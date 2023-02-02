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

const convertStrToArray = (arr) => {
  let str = '';
  const newArray = [];
  for ( let index = 0; index < arr.length; index++) {
    if (arr[index] !== ',' || index === arr.length -1 ) {
      str += arr[index];
    }
    if (arr[index] === ',') {
      newArray.push(str);
      str = '';
    }
    if ( index === arr.length - 1) {
      newArray.push(str);
    }
  }

  return newArray;
};

exports.convertStrToArray = convertStrToArray;
exports.uploadImageToCloud = uploadImageToCloud;
exports.getDateNow = getDateNow;

