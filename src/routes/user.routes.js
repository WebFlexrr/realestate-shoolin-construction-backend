const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { authentication } = require('../middlewares/middleware');

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/editUser').post(loginUser);
router.route('/userDetails').post(loginUser);

module.exports = router ;
