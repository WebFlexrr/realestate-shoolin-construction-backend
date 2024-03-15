const { Enquiry } = require('../models/enquiry.models');
const ApiError = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const createAnEnquiry = asyncHandler(async (req, res) => {
	const { name, email, phone, message } = req.body;

	if ([name, email, phone, message].some((field) => field.trim() === '')) {
		return res.status(400).json(new ApiError(400, 'all field is required'));
	}

	try {
		const enquiry = await Enquiry.create({
			name,
			email,
			phone,
			message,
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

const getAllEnquiry = asyncHandler(async (req, res) => {
	try {
		const result = await Enquiry.find({});
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
module.exports = { createAnEnquiry, getAllEnquiry };
