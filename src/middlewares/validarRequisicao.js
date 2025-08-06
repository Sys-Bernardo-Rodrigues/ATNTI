module.exports = function validarRequisicao(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const mensagens = error.details.map(d => d.message);
      return res.status(400).json({ erro: "Validação falhou", detalhes: mensagens });
    }

    next();
  };
};
