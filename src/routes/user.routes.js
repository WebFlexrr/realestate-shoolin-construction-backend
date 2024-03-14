const { Router } = require('express');
const {
	registerUser,
	loginUser,
	getImage,
	putUpload,
	registerAdminUser,
	loginAdminUser,
	logoutUser,
} = require('../controllers/user.controller');

const { putObjectUrl } = require('../utils/aws-s3-methods');
const { verifyJWT } = require('../middlewares/auth.middleware');

const router = Router();

//unsecure routes
router.route('/adminLogin').post(loginAdminUser);
router.route('/adminSignup').post(registerAdminUser);
router.route('/login').post(loginUser);
router.route('/signup').post(registerUser);

//secure routes
router.route('/editUser').post(verifyJWT,loginUser);
router.route('/userDetails').post(verifyJWT,loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

//file upload
router.route('/getImg').get(getImage);
router.route('/uploads').post(putUpload);

module.exports = router;
