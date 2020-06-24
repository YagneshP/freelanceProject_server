const express = require('express');
const router = express.Router({ mergeParams: true });
const { createVideo, getVideo, deleteVideo } = require('../handlers/videoauth');

//prefix = api/users/:id/messages
router.route('/').post(createVideo);
router.route('/:video_id').get(getVideo).delete(deleteVideo);

module.exports = router;
