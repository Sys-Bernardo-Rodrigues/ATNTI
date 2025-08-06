const Joi = require('joi');

const schemaChamadoCreate = Joi.object({
  prioridade: Joi.string().valid('baixa', 'média', 'alta').required(),
  titulo: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().min(5).required()
});

const schemaChamadoUpdate = Joi.object({
  prioridade: Joi.string().valid('baixa', 'média', 'alta').required(),
  titulo: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().min(5).required()
});

module.exports = {
  schemaChamadoCreate,
  schemaChamadoUpdate
};
