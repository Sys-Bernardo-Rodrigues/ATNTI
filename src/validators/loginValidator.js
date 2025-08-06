const Joi = require("joi");

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required()
});

module.exports = schemaLogin;
