import mongoose from 'mongoose';

const scheduleVisitSchema = new mongoose.Schema(
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
		date: {
			type: Date,
			required: true,
		},
		userAddress: {
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

export const scheduleVisit = mongoose.model(
	'scheduleVisit',
	scheduleVisitSchema
);
