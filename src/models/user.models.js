const mongoose = require('mongoose');
const passwordHashed = require('../utils/hasher');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: [true, 'Password must needed'],
			min: 6,
		},
		profilePicture: {
			type: String,
		},
		admin: {
			type: Boolean,
			default: false,
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

module.exports = User = mongoose.model('User', userSchema);
// module.exports.User = User;
