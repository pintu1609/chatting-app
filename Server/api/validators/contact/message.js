const Joi = require("joi");

const createSchema = Joi.object({
  to: Joi.string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/, "object Id")
    .required(),
  message: Joi.string().trim().required(),
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
