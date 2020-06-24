const Joi = require('@hapi/joi');

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
	});
	return schema.validate(data);
};

module.exports = loginValidation;
