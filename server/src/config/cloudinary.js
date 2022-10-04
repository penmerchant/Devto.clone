const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dhyndmdyx',
  api_key: '336711919319751',
  api_secret: '4CGLs2WuXg5pwVWXPdNJGfvhRfw',
});

module.exports = cloudinary;
