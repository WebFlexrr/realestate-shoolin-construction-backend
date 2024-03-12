const mongoose = require('mongoose');
const passwordHashed = require('../utils/hasher');
const defaultUser = require('../../public/default-user.jpg');

const userSchema = new mongoose.Schema(
	{
		name: {
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
		this.password = await passwordHashed(this.password);
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
