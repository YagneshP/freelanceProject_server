const express = require('express');
const router = express.Router({ mergeParams: true });
const { createComment, getComment, deleteComment } = require('../handlers/commentauth');

//prefix = api/users/:id/messages
router.route('/').post(createComment);
router.route('/:comment_id').get(getComment).delete(deleteComment);

module.exports = router;
