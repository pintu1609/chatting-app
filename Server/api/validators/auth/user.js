const Joi = require("joi");

const addUser = Joi.object({
    name: Joi.string().trim().required(),
    userName: Joi.string().trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().required(),
    image: Joi.string().trim()
});

const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().required(),
});

const defaults = {
    'abortEarly': false, // include all errors
    'allowUnknown': true, // ignore unknown props
    'stripUnknown': true // remove unknown props
};

const message = (error) => { return `${error.details.map(x => x.message).join(', ')}`; };

module.exports = {
    addUser,
    loginSchema,
    defaults,
    message
}