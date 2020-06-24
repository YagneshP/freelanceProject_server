const User = require('../models/User');
const Comment = require('../models/Comment');
const { json } = require('body-parser');

//creating Comment
exports.createComment = async function(req, res, next) {
	try {
		let comment = await Comment.create({
			details: req.body.details,
			createdBy: req.params.id
		});
		let foundUser = await User.findById(req.params.id);
		foundUser.comments.push(comment.id);
		await foundUser.save();
		let foundComment = await Comment.findById(comment.id).populate('createdBy', {
			firstName: true,
			profilePhotoUrl: true
		});
		return res.status(200).json(foundComment);
	} catch (error) {
		return next(error);
	}
};

//get comment
exports.getComment = async function(req, res, next) {
	try {
		let comment = await Comment.find(req.params.comment_id);
		return res.status(200).json(comment);
	} catch (error) {
		return next(error);
	}
};

//delete comment
exports.deleteComment = async function(req, res, next) {
	try {
		let foundComment = await Comment.findById(req.params.comment_id);
		await foundComment.remove();
		return res.status(200).json(foundComment);
	} catch (error) {
		return next(error);
	}
};
