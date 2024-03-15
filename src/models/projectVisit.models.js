const mongoose = require('mongoose');

const projectVisitSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			unique: true,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		userAddress: {
			type: String,
			required: true,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
	},
	{
		timestamps: true,
	}
);

const ProjectVisit = mongoose.model('ProjectVisit', projectVisitSchema);

module.exports = { ProjectVisit };
