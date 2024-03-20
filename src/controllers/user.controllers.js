const { asyncHandler } = require('../utils/asyncHandler');
const { User } = require('../models/user.models');
const ApiError = require('../utils/ApiError');
const {
	getObjectUrl,
	putObjectUrl,
	generatePutObjectUrl,
} = require('../utils/aws-s3-methods');
const { ApiResponse } = require('../utils/ApiResponse');
const { randomUUID } = require('crypto');

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			'Something went wrong while generating refresh and access token'
		);
	}
};

//Register Admin User
const registerAdminUser = asyncHandler(async (req, res) => {
	const { name, email, password, phone, gender } = req.body;

	if (
		[name, email, password, phone, gender].some((field) => field.trim() === '')
	) {
		return res.status(400).json(new ApiError(400, 'all field is required'));
	}

	if (!email.includes('@')) {
		return res.status(400).json(new ApiError(400, 'Email is invalid'));
	}

	const existedUser = await User.findOne({
		$or: [{ email }],
	});

	if (existedUser) {
		return res
			.status(409)
			.json(new ApiError(409, 'User with email already exists'));
	}

	const user = await User.create({
		name,
		email,
		phone,
		gender,
		password,
		admin: true,
	});

	const createdUser = await User.findById(user._id).select(
		'-password -refreshToken'
	);

	if (!createdUser) {
		return res
			.status(500)
			.json(new ApiError(500, 'Something went wrong registering the user'));
	}

	return res
		.status(201)
		.json(
			new ApiResponse(200, createdUser, 'Admin User registered successfully')
		);
});

//Login Admin User
const loginAdminUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, 'Please Enter all the Fields'));
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json(new ApiError(404, ' User does not Exist'));
	}

	if (!user.admin) {
		return res.status(404).json(new ApiError(404, 'Your are not a Admin User'));
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		return res.status(401).json(new ApiError(401, 'Invalid user credentials'));
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	);

	const loggedInUser = await User.findById(user._id).select(
		'-password -refreshToken'
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
					accessToken,
					refreshToken,
					FRONTEND_URL: process.env.FRONTEND_URL,
				},
				'User logged In Successfully'
			)
		);
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, phone, gender } = req.body;

	if (
		[name, email, password, phone, gender].some((field) => field.trim() === '')
	) {
		return res.status(400).json(new ApiError(400, 'all filed is required'));
	}

	if (!email.includes('@')) {
		return res.status(400).json(new ApiError(400, 'Email is invalid'));
	}

	const existedUser = await User.findOne({
		$or: [{ email }],
	});

	if (existedUser) {
		return res
			.status(400)
			.json(new ApiError(409, 'User with email already exists'));
	}

	const user = await User.create({
		name,
		email,
		phone,
		gender,
		password,
	});

	const createdUser = await User.findById(user._id).select(
		'-password -refreshToken'
	);

	if (!createdUser) {
		return res
			.status(500)
			.json(new ApiError(500, 'Something went wrong registering the user'));
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdUser, 'User registered successfully'));
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, 'Please Enter all the Fields'));
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json(new ApiError(404, 'User does not Exist'));
	}

	const isPasswordValid = await user.isPasswordCorrect(password);

	if (!isPasswordValid) {
		return res.status(401).json(new ApiError(401, 'Invalid user credentials'));
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	);

	const loggedInUser = await User.findById(user._id).select(
		'-password -refreshToken'
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
					accessToken,
					refreshToken,
				},
				'User logged In Successfully'
			)
		);
});

//Logout User
const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$set: {
				refreshToken: undefined,
			},
		},
		{
			new: true,
		}
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie('accessToken', options)
		.clearCookie('refreshToken', options)
		.json(new ApiResponse(200, {}, 'User Logged out'));
});

const getImage = asyncHandler(async (req, res) => {
	// const { key } = req.body;
	console.log(req.file);

	// try {
	// 	const objectUrl = await getObjectUrl(key);
	// 	console.log('assets/default-avatar-icon.jpg ---->', objectUrl);
	// 	res.status(200).json(objectUrl);
	// } catch (error) {
	// 	throw new Error(error);
	// }
	return res.send(req.file);
});

const putUpload = asyncHandler(async (req, res) => {
	const { path, filename, contentType } = req.body;
	try {
		const objectUrl = await putObjectUrl(path, filename, contentType);
		console.log('assets/default-avatar-icon.jpg ---->', objectUrl);
		res.status(200).json(objectUrl);
	} catch (error) {
		throw new Error(error);
	}
});

const generateUploadUrl = asyncHandler(async (req, res) => {
	const { contentType } = req.body;
	console.log(contentType);

	// const ex = `${req.query.contentType}`.split('/')[1];
	const ex = contentType.split('/')[1];

	
	const fileName = `user-${randomUUID()}.${ex}`;
	try {
		const url = await generatePutObjectUrl(
			'asset/users-uploads',
			fileName,
			contentType
		);

		return res.status(200).json(new ApiResponse(200, url));
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(new ApiError(500, 'Upload Url not generated', error));
	}
});

module.exports = {
	registerUser,
	loginUser,
	registerAdminUser,
	loginAdminUser,
	logoutUser,
	getImage,
	putUpload,
	generateUploadUrl,
};
