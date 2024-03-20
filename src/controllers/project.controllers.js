const { restart } = require('nodemon');
const { Project } = require('../models/project.models');
const ApiError = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiResponse } = require('../utils/ApiResponse');
const { putObjectUrl } = require('../utils/aws-s3-methods');

//Create A New Project
const createProject = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		propertyType,
		status,
		brochure,
		apartmentType,
		totalUnits,
		possessionDate,
		totalFloors,
		description,
		amenities,
		masterPlan,
		unitPlan,
		map,
		address,
		thumbnail,
		coverImages,
		isPublished,
	} = req.body;

	const existedProject = await Project.findOne({ name });

	if (existedProject) {
		return res.status(400).json(new ApiError(404, 'Project already Exists'));
	}
	try {
		const createdProject = await Project.create({
			name,
			price,
			propertyType,
			status,
			brochure,
			apartmentType,
			totalUnits,
			possessionDate,
			totalFloors,
			description,
			amenities,
			masterPlan,
			unitPlan,
			map,
			address,
			thumbnail,
			coverImages,
			isPublished,
		});

		if (!createdProject) {
			return res
				.status(500)
				.json(
					new ApiError(
						500,
						'Internal Error happened. Project not created. Please Retry!!!!'
					)
				);
		}

		return res
			.status(200)
			.json(
				new ApiResponse(200, createdProject, 'Project Successfully created..')
			);
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

// Get All Projects
const getAllProjects = asyncHandler(async (req, res) => {
	try {
		const allProjects = await Project.find({});
		return res.status(200).json(new ApiResponse(200, allProjects));
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

// Get only specific Project
const getSingleProject = asyncHandler(async (req, res) => {
	const projectName = req.params['name'];
	try {
		const getProject = await Project.findOne({ name: projectName });

		if (!getProject) {
			return res.status(400).json(new ApiError(400, 'Project is not Existed'));
		}

		return res.status(200).json(new ApiResponse(200, getProject));
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

//Edit a project
const editProject = asyncHandler(async (req, res) => {
	const {
		_id,
		name,
		price,
		tags,
		brochure,
		apartmentType,
		totalUnits,
		possessionDate,
		totalFloors,
		description,
		amenities,
		masterPlan,
		unitPlan,
		map,
		address,
		thumbnail,
		coverImages,
		isPublished,
	} = req.body;

	if (!req.user.admin) {
		return res
			.status(400)
			.json(
				new ApiError(
					400,
					'this is not a admin account, Action could not perform'
				)
			);
	}

	try {
		const updatedProject = await Project.findByIdAndUpdate(
			_id,
			{
				name,
				price,
				tags,
				brochure,
				apartmentType,
				totalUnits,
				possessionDate,
				totalFloors,
				description,
				amenities,
				masterPlan,
				unitPlan,
				map,
				address,
				thumbnail,
				coverImages,
				isPublished,
			},
			{
				new: true,
			}
		);

		if (!updatedProject) {
			return res
				.status(400)
				.json(new ApiError(400, 'Given record is not found,Pls retry'));
		}

		return res
			.status(200)
			.json(
				new ApiResponse(200, updatedProject, 'Project successfully updated')
			);
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

//Delete only Specific Project
const deleteAllProject = asyncHandler(async (req, res) => {
	try {
		const result = await Project.deleteMany({});
		return res
			.status(200)
			.json(new ApiResponse(200, result, 'All Projects are Delete Successful'));
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

//Delete only Specific Project
const deleteSingleProject = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (id.trim() === '') {
		return res.status(400).json(new ApiError(400, 'Given Id is not Valid'));
	}

	try {
		const result = await Project.deleteOne({ _id: id });
		return res
			.status(200)
			.json(new ApiResponse(200, result, 'Single Project Delete Successful'));
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

const projectImagesUpload = asyncHandler(async (req, res) => {
	const { path, filename, contentType } = req.body;
	try {
		const objectUrl = await putObjectUrl(path, filename, contentType);
		console.log('assets/default-avatar-icon.jpg ---->', objectUrl);
		res.status(200).json(objectUrl);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createProject,
	getAllProjects,
	getSingleProject,
	editProject,
	deleteAllProject,
	deleteSingleProject,
	projectImagesUpload,
};
