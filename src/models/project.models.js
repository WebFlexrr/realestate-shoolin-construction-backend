import mongoose from 'mongoose';

const amenitiesItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	Image: {
		type: String,
		required: true,
	},
	type: {
		type: Boolean,
		required: true,
	},
});

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		tags: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		location: {
			type: {
				type: String, // Don't do `{ location: { type: String } }`
				enum: ['Point'], // 'location.type' must be 'Point'
				// required: true
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		amenities: {
			type: [amenitiesItemSchema],
			default: null,
		},
		constructionStatus: [
			{
				time: {
					type: Date,
				},
				image: {
					type: String,
				},
			},
		],
		brochure: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		layout: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Layout',
		},
	},
	{
		timestamps: true,
	}
);

export const Project = mongoose.model('Project', projectSchema);
