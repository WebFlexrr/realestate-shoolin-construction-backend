const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		message: {
			type: String,
		},
		// projectId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Project',
		// 	default: null,
		// },
	},
	{
		timestamps: true,
	}
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = { Enquiry };
