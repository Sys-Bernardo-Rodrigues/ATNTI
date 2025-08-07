const Joi = require("joi");

const schemaStatus = Joi.object({
  status: Joi.string()
    .valid("em atendimento", "pausado", "finalizado", "comentario") // Adicione "comentario" aqui
    .required()
    .messages({
      "any.only": "Status deve ser 'em atendimento', 'pausado', 'finalizado' ou 'comentario'."
    }),
  comentario: Joi.string().min(3).required(),
  usuario_id: Joi.number().integer().required()
});

module.exports = schemaStatus;