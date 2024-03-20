const { Router } = require('express');
const {
	registerUser,
	loginUser,
	getImage,
	putUpload,
	registerAdminUser,
	loginAdminUser,
	logoutUser,
	preAssignUrl,
	generateUploadUrl,
} = require('../controllers/user.controllers');

const { verifyJWT } = require('../middlewares/auth.middleware');
const multer = require('multer');
const { upload } = require('../middlewares/multer.middleware');

const router = Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
//unsecure routes
router.route('/adminLogin').post(loginAdminUser);
router.route('/adminSignup').post(registerAdminUser);
router.route('/login').post(loginUser);
router.route('/signup').post(registerUser);

//secure routes
router.route('/editUser').post(verifyJWT, loginUser);
router.route('/userDetails').get(verifyJWT, loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

//file upload
router.route('/uploads').post(upload.single('pic'), getImage);
router.route('/generateUploadUrl').post(generateUploadUrl);
// router.route('/uploads').post(putUpload);

module.exports = router;
