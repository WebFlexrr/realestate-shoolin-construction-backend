const { Router } = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware');
const {
	createProject,
	getAllProjects,
	getSingleProject,
    deleteSingleProject,
    deleteAllProject,
} = require('../controllers/project.controllers');

const router = Router();

// Create Project
router.route('/createProject').post(verifyJWT, createProject);

//Edit the Project
// router.route('/editProject').post(verifyJWT,editProject);

// Get Details
router.route('/getAllProjects').get(verifyJWT, getAllProjects);
router.route('/getSingleProject/:name').get(verifyJWT, getSingleProject);

//Delete
router.route('/deleteSingleProject').delete(verifyJWT, deleteSingleProject);
router.route('/deleteAllProject').delete(verifyJWT, deleteAllProject);

module.exports = router;
