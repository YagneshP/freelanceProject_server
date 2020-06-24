const User = require('../models/User');
const jwt = require('jsonwebtoken');
const registrationValidation = require('../validation/registration');
const loginValidation = require('../validation/loginValidation');

//login handler for authentication
exports.signIn = async function(req, res, next) {
	const { error } = loginValidation(req.body);
	if (error) return next({ status: 400, message: error.details[0].message });
	try {
		//find the user with email
		let foundUser = await User.findOne({
			email: req.body.email
		});
		let { id, firstName, lastName, profilePhotoUrl } = foundUser;
		//compare userPassword with hashed password
		let isMatch = await foundUser.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					id,
					firstName,
					lastName,
					profilePhotoUrl
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id,
				firstName,
				lastName,
				profilePhotoUrl,
				token
			});
		} else {
			return next({
				status: 400,
				message: 'Invalid Email/Password'
			});
		}
	} catch (err) {
		return next({
			status: 400,
			message: 'Invalid Email/Password'
		});
	}
};

//signUp handler for authentication of new User

exports.signUp = async function(req, res, next) {
	const { error } = registrationValidation(req.body);
	if (error) return next({ status: 400, message: error.details[0].message });
	try {
		let newUser = await User.create(req.body);
		let { id, firstName, lastName, email, profilePhotoUrl } = newUser;
		let token = jwt.sign(
			{
				id,
				firstName,
				lastName,
				email,
				profilePhotoUrl
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			firstName,
			lastName,
			email,
			profilePhotoUrl,
			token
		});
	} catch (err) {
		if (err.code === 11000) {
			err.message = 'Sorry, that email is already taken';
		}
		return next({
			status: 400,
			message: err.message
		});
	}
};
