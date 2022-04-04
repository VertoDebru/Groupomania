const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Storage images.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if(file.fieldname === 'image') callback(null, 'images');
    else callback(null,'avatars');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name.split('.'+extension).join(Date.now()) + '.' + extension);
  }
});

module.exports = multer({storage: storage});
