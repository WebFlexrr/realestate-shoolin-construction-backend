const { Router } = require('express');
const {
	createAnEnquiry,
	getAllEnquiry,
} = require('../controllers/enquiry.controllers');
const { verifyJWT } = require('../middlewares/auth.middleware');

const router = Router();

router.route('/createEnquiry').post(createAnEnquiry);
router.route('/getAllEnquiry').get(verifyJWT, getAllEnquiry);
router.route('/editEnquiry').put();

module.exports = router;
