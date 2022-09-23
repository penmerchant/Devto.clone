const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, 'upload');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname+'.jpg');
  },
});

const upload = multer({storage: storage});

module.exports = upload;
