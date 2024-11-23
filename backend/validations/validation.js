const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) 
        .required(),
        phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'any.required': 'Phone number is required.',
            'string.empty': 'Phone number cannot be empty.',
            'string.pattern.base': 'Phone number must be a valid 10-digit number.',
        })
});

module.exports = { signupSchema };