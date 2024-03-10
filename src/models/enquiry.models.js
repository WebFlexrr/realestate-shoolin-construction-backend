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
		number: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			
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

module.exports = Enquiry = mongoose.model('Enquiry', enquirySchema);
