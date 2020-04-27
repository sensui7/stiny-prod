const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Returns a promise
async function uploadPhoto(filename) {
	return cloudinary.uploader.upload("uploads/" + filename);
}

// This retrieves the image
//cloudinary.api.resources_by_tag("test", function(error, result){console.log(result);});

module.exports = uploadPhoto;
