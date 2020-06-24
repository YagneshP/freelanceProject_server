const User = require('../models/User');
const Comment = require('../models/Comment');
const Playlist = require('../models/Playlist');

//creating Comment
exports.createPlaylist = async function(req, res, next) {
	try {
		let newPlaylist = await Playlist.create({
			name: req.body.name,
			detail: req.body.detail,
			tag: req.body.tag,
			uploadBy: req.params.id
		});
		let {
			id,
			name,
			detail,
			tag,
			uploadBy,
			videos,
			createdOn,
			updateBy,
			updateOn,
			comments,
			firstName
		} = newPlaylist;

		//////////////////////////////////////////////
		/// for admin
		////////////////////////////////////
		let foundUser = await User.findById(req.params.id);
		foundUser.playLists.push(newPlaylist.id);
		await foundUser.save();
		let foundPlayList = await Playlist.findById(newPlaylist.id).populate('uploadBy', {
			firstName: true,
			profilePhotoUrl: true
		});
		return res.status(200).json(foundPlayList);
	} catch (error) {
		return next(error);
	}
};

//get comment
exports.getPlaylist = async function(req, res, next) {
	try {
		let playList = await Playlist.find(req.params.playlist_id);
		return res.status(200).json(playList);
	} catch (error) {
		return next(error);
	}
};

//delete comment
exports.deletePlaylist = async function(req, res, next) {
	try {
		let foundPlaylist = await Playlist.findById(req.params.playlist_id);
		await foundPlaylist.remove();
		return res.status(200).json(foundPlaylist);
	} catch (error) {
		return next(error);
	}
};

//update playlist

exports.updatePlaylist = async function(req, res, next) {
	try {
		let updatedPlaylist = await Playlist.findByIdAndUpdate(
			{ _id: req.params.playlist_id },
			{
				$set: {
					name: req.body.name,
					detail: req.body.detail,
					tag: req.body.tag,
					videos: req.body.videos,

					updateBy: req.params.id,
					updateOn: req.body.updateOn,
					comments: req.body.comments
				}
			}
		);
		updatedPlaylist.save();
		return res.status(200).json(updatedPlaylist);
	} catch (error) {
		return next(error);
	}
};
