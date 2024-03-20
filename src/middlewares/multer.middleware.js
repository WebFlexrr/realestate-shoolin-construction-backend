const multer = require('multer');
const multerS3 = require("multer-s3")
const { s3Client } = require('../config/aws-sdk-s3-config');

const upload = multer({
	storage: multerS3({
		s3: s3Client,
		bucket: "shoolin-construction-asset",
		// acl: 'public-read',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
});

module.exports = { upload };
