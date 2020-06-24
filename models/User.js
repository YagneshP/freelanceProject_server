const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Video = require('./Video');

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	profilePhotoUrl: {
		type: String
	},
	mobileNumber: {
		type: Number
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	language: {
		type: [ { type: String } ]
	},
	bio: {
		type: String,
		maxlength: 160
	},
	createDate: {
		type: Date,
		default: Date.now()
	},
	updateDate: {
		type: Date,
		default: Date.now()
	},
	loginDate: {
		type: Date,
		default: Date.now()
	},
	subscriptionId: {
		type: String
	},
	payment: {
		type: []
	},
	playLists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Playlist'
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	videos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video'
		}
	]
});

//pre hook before saving user
UserSchema.pre('save', async function(next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		//hashing the password before saving to db
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (error) {
		return next(error);
	}
});

UserSchema.methods.comparePassword = async function(userPassword, next) {
	try {
		let isMatch = await bcrypt.compare(userPassword, this.password);
		return isMatch;
	} catch (error) {
		return next(error);
	}
};

module.exports = User = mongoose.model('User', UserSchema);
