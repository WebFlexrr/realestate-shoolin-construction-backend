const { User } = require('../models/user.models');
const ApiError = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const verifyJWT = asyncHandler(async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header('Authorization')?.replace('Bearer ','');
		if (!token) {
			return res
				.status(401)
				.json(new ApiError(401, 'Unauthorized request', token));
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const user = await User.findById(decodedToken?._id).select(
			'-password -refreshToken'
		);

		if (!user) {
			return res.status(401).json(new ApiError(401, 'Invalid Access Token'));
		}

		req.user = user;
		next();
	} catch (error) {
		return res
			.status(400)
			.json(new ApiError(400, error?.message || 'Invalid Access Token'));
	}
});

module.exports = { verifyJWT };
