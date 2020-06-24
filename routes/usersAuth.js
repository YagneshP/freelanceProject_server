const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../handlers/auth');
// //UserModel
const User = require('../models/User');

//@route GET api/users
//@desc  GET all users

// router.get('/', (req, res) => {
// 	User.find().then((users) => res.json(users));
// });

//@route POST api/users
//@desc  Create a User
router.post('/signup', signUp);

//@route POST api/users
//@desc  login or signin a User
router.post('/signin', signIn);

//@route DELETE api/users/:id
//@desc  DELETE a User
// router.delete('/:id', (req, res) => {
// 	User.findById(req.params.id)
// 		.then((user) => user.remove().then(() => res.json({ sucess: true })))
// 		.catch((error) => res.status(404).json({ success: false }));
// });

module.exports = router;
