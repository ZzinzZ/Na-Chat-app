const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "djz3q3fqf", 
    api_key: "913186144133332", 
    api_secret: "m7qeuM9mmRTNxQmA8LVsI"
});

module.exports = cloudinary;