const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const CommentSchema = new Schema(
	{
		createdBy: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
		detail: {
			type: String,
			max: 200
		},
		// createdOn: {
		// 	type: Date,
		// 	default: Date.now
		// },
		// updatedOn: {
		// 	type: Date,
		// 	default: Date.now
		// },
		updatedBy: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
	},
	{
		timestamps: true
	}
);

CommentSchema.pre('remove', async function(next) {
	try {
		let foundUser = await User.findById(this.createdBy);
		foundUser.comments.remove(this.id);
		await User.save();
		return next();
	} catch (error) {
		return next(error);
	}
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
