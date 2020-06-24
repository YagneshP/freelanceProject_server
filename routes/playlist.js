const express = require('express');
const router = express.Router({ mergeParams: true });
const { createPlaylist, getPlaylist, deletePlaylist, updatePlaylist } = require('../handlers/playllistauth');

//prefix = api/users/:id/messages
router.route('/').post(createPlaylist);
router.route('/:playlist_id').get(getPlaylist).delete(deletePlaylist).put(updatePlaylist);

module.exports = router;
