const { asyncHandler } = require('../utils/asyncHandler');
const { User } = require('../models/user.models');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, phone, gender, password, admin } = req.body;

	console.log(req.body);
	if (!name || !email || !password || !phone || !gender || !admin) {
		res.status(400);
		throw new Error('Please Enter all the Fields');
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json('User already exists');
	}

	try {
		const user = await User.create({
			name,
			email,
			phone,
			gender,
			password,
			admin,
		});
		console.log(user);

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				image: user.image,
				// token: generateJwtToken(user._id),
			});
		} else {
			res.status(400).json('Failed to create the User');
		}
	} catch (error) {
		return res.status(400).json(error);
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
		// token: generateJwtToken(user._id),
	});
	// if (user && (await passwordCompare(password, user.password))) {
	// } else {
	// 	return res.status(400).json('Invalid Email or Password');
	// }
});

module.exports = { registerUser, loginUser };
