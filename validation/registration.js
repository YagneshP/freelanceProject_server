const Joi = require('@hapi/joi');

const registrationValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(30).required(),
		lastName: Joi.string().min(3).max(30).required(),
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});
	return schema.validate(data);
};

module.exports = registrationValidation;
