const cloudinary = require('../config/cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const { trace } = require('../Routes/userRoute');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "Na-social",
    allowedFormats: ['jpg', 'png', 'gif', 'jpeg'],
    transformation: [{width: 500, height: 500, crop: 'limit'}]
    
});
const upload = multer({
    storage: storage
})

module.exports = upload;