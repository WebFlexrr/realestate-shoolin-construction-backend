const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const amenitiesItemSchema = new mongoose.Schema({
	name: {
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
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		tags: [
			{
				type: String,
				required: true,
				lowercase: true,
			},
		],
		apartmentType: [
			{
				type: Number,
				required: true,
			},
		],
		totalUnits: {
			type: Number,
			required: true,
		},
		possessionDate: {
			type: Date,
			required: true,
		},
		floors: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			required: true,
			trim: true,
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
		brochure: [
			{
				type: String,
			},
		],
		image: {
			type: String, //AWS S3 URL
			required: true,
		},

		coverImages: [
			{
				type: String, //AWS S3 URL
			},
		],
		// layout: {
		// 	type: mongoose.Schema.Types.ObjectId, //AWS S3 URL
		// 	ref: 'Layout',
		// },
		projectVisit: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProjectVisit',
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

projectSchema.plugin(mongooseAggregatePaginate);

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
