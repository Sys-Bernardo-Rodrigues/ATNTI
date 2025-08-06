const Joi = require("joi");

const schemaStatus = Joi.object({
  status: Joi.string()
    .valid("em atendimento", "pausado", "finalizado")
    .required()
    .messages({
      "any.only": "Status deve ser 'em atendimento', 'pausado' ou 'finalizado'."
    }),
  comentario: Joi.string().min(3).required(),
  usuario_id: Joi.number().integer().required()
});

module.exports = schemaStatus;
