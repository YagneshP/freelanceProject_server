const User = require('../models/User');
const Comment = require('../models/Comment');
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');

//creating Comment
exports.createVideo = async function(req, res, next) {
	try {
		let newVideo = await Video.create({
			url: req.body.url,
			shortDescription: req.body.shortDescription,
			createdBy: req.params.id,
			uploadedBy: req.params.id
		});
		let { id, url, shortDescription, description, createdOn, createdBy, uploadedBy, uploadedOn } = newVideo;

		//////////////////////////////////////////////
		/// for admin
		////////////////////////////////////
		let foundUser = await User.findById(req.params.id);
		foundUser.videos.push(newVideo.id);
		await foundUser.save();
		let foundVideo = await Video.findById(newVideo.id).populate('uploadBy', {
			firstName: true,
			profilePhotoUrl: true
		});
		return res.status(200).json(foundVideo);
	} catch (error) {
		return next(error);
	}
};

//get comment
exports.getVideo = async function(req, res, next) {
	try {
		let video = await Playlist.find(req.params.video_id);
		return res.status(200).json(video);
	} catch (error) {
		return next(error);
	}
};

//delete comment
exports.deleteVideo = async function(req, res, next) {
	try {
		let foundVideo = await Playlist.findById(req.params.video_id);
		await foundVideo.remove();
		return res.status(200).json(foundVideo);
	} catch (error) {
		return next(error);
	}
};
