const { ProjectVisit } = require('../models/projectVisit.models');
const ApiError = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const createProjectVisit = asyncHandler(async (req, res) => {
	const { name, email, phone, date, owner, userAddress, projectId } = req.body;

	if (
		[name, email, phone, date, owner, userAddress, projectId].some(
			(field) => field.trim() === ''
		)
	) {
		return res.status(400).json(new ApiError(400, 'all field is required'));
	}

	const userExist = await ProjectVisit.findOne({
		$and: [{ owner, projectId }],
	});
    
	if (userExist) {
        console.log(userExist)
		return res
			.status(400)
			.json(new ApiError(400, 'Visit Request already created'));
	}

	try {
		const enquiry = await ProjectVisit.create({
			name,
			email,
			phone,
			date,
			owner,
			userAddress,
			projectId,
		});

		return res
			.status(200)
			.json(new ApiResponse(200, enquiry, 'Enquiry is successfully Created'));
	} catch (error) {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});

const getAllProjectVisits = asyncHandler(async (req, res) => {
	try {
		const result = await ProjectVisit.find({});
		if (!result) {
			return res
				.status(200)
				.json(new ApiResponse(200, result, 'Enquiries are Empty'));
		}

		return res
			.status(200)
			.json(new ApiResponse(200, result, 'All Enquiry are fetched Created'));
	} catch {
		return res
			.status(500)
			.json(
				new ApiError(500, 'Internal Error happened. Please retry!!!!', error)
			);
	}
});
module.exports = { createProjectVisit, getAllProjectVisits };
