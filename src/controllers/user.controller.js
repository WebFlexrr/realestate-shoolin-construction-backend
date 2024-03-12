const asyncHandler = require('express-async-handler');
const User = require('../models/user.models');
const expressAsyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, image } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please Enter all the Fields');
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
		image,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			image: user.image,
			// token: generateJwtToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Failed to create the User');
	}
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json('Please Enter all the Fields');
		// throw new Error();
	}
	const user = await User.findOne({ email });

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		image: user.image,
		token: generateJwtToken(user._id),
	});
	// if (user && (await passwordCompare(password, user.password!))) {
	// } else {
	//   return res.status(400).json("Invalid Email or Password");
	//   // throw new Error("Invalid Email or Password");
	// }
});

module.exports = { registerUser, loginUser };
