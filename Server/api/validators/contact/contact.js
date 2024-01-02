const Joi = require("joi");

const createSchema = Joi.object({
  addedTo: Joi.string()
    .trim()
    .required(),
});

const defaults = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const message = (error) => {
  return `${error.details.map((x) => x.message).join(", ")}`;
};

module.exports = {
  createSchema,
  // updateSchema,
  defaults,
  message,
};
