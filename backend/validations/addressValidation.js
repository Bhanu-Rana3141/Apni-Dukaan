const Joi = require('joi');

const addressValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/) // Enforce 10-digit phone number
        .required(),
    address: Joi.string().min(5).max(200).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    pincode: Joi.string()
        .pattern(/^[1-9][0-9]{5}$/) // Enforce a 6-digit valid pincode
        .required(),
});
