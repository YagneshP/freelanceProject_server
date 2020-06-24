const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const VideoSchema = new Schema(
	{
		url: {
			type: String,
			required: true
		},
		shortDescription: {
			type: String,
			max: 120,
			required: true
		},
		description: {
			type: String,
			min: 20,
			max: 200
		},
		// createdOn: {
		// 	type: Date,
		// 	default: Date.now
		// },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
		// uploadedOn: {
		// 	type: Date,
		// 	default: Date.now
		// }
	},
	{
		timestamps: true
	}
);

module.exports = Video = mongoose.model('Video', VideoSchema);
