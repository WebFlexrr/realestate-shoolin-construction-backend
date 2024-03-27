const { Router } = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware');
const {
	createProject,
	getAllProjects,
	getSingleProject,
	deleteProject,
    deleteAllProject,
	editProject,
	// projectImagesUpload,
	generateUploadUrl,
} = require('../controllers/project.controllers');

const router = Router();

// Create Project
router.route('/createProject').post(verifyJWT, createProject);

//Edit the Project
router.route('/editProject').patch(verifyJWT,editProject);

// Get Details
router.route('/getAllProjects').get(getAllProjects);
router.route('/getSingleProject/:slug').get(getSingleProject);

//Delete
router.route('/deleteAllProject').delete(verifyJWT, deleteAllProject);
router.route('/deleteProject').delete(verifyJWT, deleteProject);

//file upload
// router.route('/getImg').get(getImage);
// router.route('/uploads').post(projectImagesUpload);
router.route('/generateUploadUrl').post(generateUploadUrl);

module.exports = router;
