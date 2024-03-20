const { Router } = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware');
const {
	createProject,
	getAllProjects,
	getSingleProject,
    deleteSingleProject,
    deleteAllProject,
	editProject,
	projectImagesUpload,
} = require('../controllers/project.controllers');

const router = Router();

// Create Project
router.route('/createProject').post(verifyJWT, createProject);

//Edit the Project
router.route('/editProject').patch(verifyJWT,editProject);

// Get Details
router.route('/getAllProjects').get(verifyJWT, getAllProjects);
router.route('/getSingleProject/:name').get(verifyJWT, getSingleProject);

//Delete
router.route('/deleteSingleProject').delete(verifyJWT, deleteSingleProject);
router.route('/deleteAllProject').delete(verifyJWT, deleteAllProject);

//file upload
// router.route('/getImg').get(getImage);
router.route('/uploads').post(projectImagesUpload);

module.exports = router;
