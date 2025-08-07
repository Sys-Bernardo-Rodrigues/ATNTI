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

// NOVO: Esquema de validação para atribuição de chamado
const schemaChamadoAtribuir = Joi.object({
  responsavel_id: Joi.number().integer().required()
});

module.exports = {
  schemaChamadoCreate,
  schemaChamadoUpdate,
  schemaChamadoAtribuir // exporte o novo esquema
};