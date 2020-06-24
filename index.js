const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const { loginRequired, ensureCorrectUser } = require('./middleware/authMiddleware');
const User = require('./models/User');
const Comment = require('./models/Comment');
const Playlist = require('./models/Playlist');
const Video = require('./models/Video');
require('dotenv/config');
// setup express App
const app = express();
//crossorigin
app.use(cors());
//BodyParser MiddleWare
app.use(bodyParser.json());

//connect to mongoDB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true },
	() => {
		console.log('connected to mongo database');
	}
);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//Import Routes
const usersAuthRoute = require('./routes/usersAuth');
const commentAuthRoute = require('./routes/comment');
const playlistAuthRoute = require('./routes/playlist');
const videoAuthRoute = require('./routes/video');

app.use('/api/users', usersAuthRoute);
app.use('/api/users/:id/comments', loginRequired, ensureCorrectUser, commentAuthRoute);
app.use('/api/users/:id/playlists', loginRequired, ensureCorrectUser, playlistAuthRoute);
app.use('/api/users/:id/videos', loginRequired, ensureCorrectUser, videoAuthRoute);

//Routes
app.get('/api/playlists', loginRequired, async function(req, res, next) {
	try {
		let playlists = await Playlist.find().sort({ createdAt: 'desc' }).populate('uploadBy', {
			firstName: true,
			profilePhotoUrl: true
		});
		return res.status(200).json(playlists);
	} catch (error) {
		return next(error);
	}
});

//if none of the route reached
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);
//listen for request
const port = process.env.PORT || 8086;
app.listen(port, function() {
	console.log(`Server is listening on ${port}`);
});
