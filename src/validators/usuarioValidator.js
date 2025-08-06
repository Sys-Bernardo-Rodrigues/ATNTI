const Joi = require('joi');

const schemaUsuarioCreate = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipo: Joi.string().valid('comum', 'admin').required()
});

const schemaUsuarioUpdate = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required()
});

module.exports = {
  schemaUsuarioCreate,
  schemaUsuarioUpdate
};
