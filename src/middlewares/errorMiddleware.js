function errorMiddleware(err, req, res, next) {
  console.error(err.stack); // Registra o erro no console
  
  if (err.name === 'ValidationError') {
    // Erro de validação Joi
    return res.status(400).json({ 
      erro: "Validação falhou", 
      detalhes: err.details.map(d => d.message)
    });
  }

  // Resposta padrão para qualquer outro erro
  res.status(500).json({
    erro: 'Ocorreu um erro interno do servidor.'
  });
}

module.exports = errorMiddleware;