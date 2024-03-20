const { Router } = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware');
const {
	createProject,
	getAllProjects,
	getSingleProject,
	deleteSingleProject,
	deleteAllProject,
	editProject,
} = require('../controllers/project.controllers');
const { createProjectVisit, getAllProjectVisits } = require('../controllers/projectVisit.controllers');

const router = Router();

// Create Project Visit
router.route('/createProjectVisit').post(verifyJWT, createProjectVisit);

//Edit the Project
router.route('/editProject').post(verifyJWT,editProject);

// Get Details
router.route('/getAllProjectVisits').get(verifyJWT, getAllProjectVisits);
// router.route('/getSingleProject/:name').get(verifyJWT, getSingleProject);

// //Delete
// router.route('/deleteSingleProject').delete(verifyJWT, deleteSingleProject);
// router.route('/deleteAllProject').delete(verifyJWT, deleteAllProject);

module.exports = router;
