const mongoose = require('mongoose');
const { passwordHashed, passwordCompare } = require('../utils/hasher');
const defaultUser = require('../../public/default-user.jpg');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		phone: {
			type: Number,
			unique: true,
			trim: true,
		},
		gender: {
			type: String,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			min: 6,
		},
		profilePicture: {
			type: String, //aws S3 url
			required: true,
			default: defaultUser,
		},
		admin: {
			type: Boolean,
			required: true,
			default: false,
		},
		projectVisit: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProjectVisit',
			},
		],
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		this.password = await passwordHashed(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await passwordCompare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			fullName: this.fullName,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			fullName: this.fullName,
			email: this.email,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
