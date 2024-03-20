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

const unitPlanItemsSchema = new mongoose.Schema({
	flatName: {
		type: String,
		required: true,
	},
	floorNo: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	coveredArea: {
		type: String,
		// required: true,
	},
	stairArea: {
		type: String,
		// required: true,
	},
	builtUpArea: {
		type: String,
		// required: true,
	},
	serviceArea: {
		type: String,
		// required: true,
	},
	totalArea: {
		type: String,
		// required: true,
	},
	sold: {
		type: Boolean,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
});

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		price: {
			type: String,
			trim: true,
		},

		propertyType: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},

		status: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},

		apartmentType: [
			{
				type: String,
				required: true,
				trim: true,
			},
		],
		totalUnits: {
			type: String,
			required: true,
		},
		possessionDate: {
			type: Date,
			required: true,
		},
		totalFloors: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		amenities: [
			{
				type: String,
				required: true,
				lowercase: true,
				trim: true,
			},
		],
		masterPlan: {
			type: String,
		},
		unitPlan: [unitPlanItemsSchema],
		map: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
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

		thumbnail: {
			type: String, //AWS S3 URL
			// required: true,
		},
		coverImages: [
			{
				type: String, //AWS S3 URL
				trim: true,
			},
		],
		projectVisit: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProjectVisit',
			},
		],
		// owner: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// },
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
