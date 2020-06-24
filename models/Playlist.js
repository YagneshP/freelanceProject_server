const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Video = require('./Video');
const User = require('./User');
const Comment = require('./Comment');

const PlaylistSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		detail: {
			type: String,
			max: 100
		},
		tag: [ { type: String } ],
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User'
		// },
		uploadBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		videos: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Video' } ],
		// createdOn: { type: Date, default: Date.now },
		updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		// updateOn: { type: Date, default: Date.now },
		comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
	},
	{
		timestamps: true
	}
);

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);
