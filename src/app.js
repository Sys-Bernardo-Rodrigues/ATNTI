// src/app.js
const express = require('express');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Rotas
const authRoutes         = require('./routes/authRoutes');
const userRoutes         = require('./routes/userRoutes');
const chamadoRoutes      = require('./routes/chamadoRoutes');
const statusRoutes       = require('./routes/statusRoutes');
const anexoRoutes        = require('./routes/anexoRoutes');
const notificacaoRoutes  = require('./routes/notificacaoRoutes');

// Middleware de erro
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middleware para JSON
app.use(express.json());

// ============================
// 📚 Documentação Swagger
// ============================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================
// 🔐 Rotas protegidas e públicas
// ============================
app.use(authRoutes); // mantém como estava (as próprias rotas definem o prefixo interno)
app.use('/usuarios', userRoutes);
app.use('/chamados', chamadoRoutes);
app.use('/chamados/:chamado_id/status', statusRoutes);
app.use('/chamados/:chamado_id/anexos', anexoRoutes);
app.use('/notificacoes', notificacaoRoutes);

// ============================
// 🌐 Rota base
// ============================
app.get('/', (req, res) => {
  res.send('API do Sistema de Atendimento T.I. está no ar 🚀');
});

// ============================
// ❌ Rota não encontrada
// ============================
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// ============================
// ❗ Erro interno
// ============================
app.use(errorMiddleware);

module.exports = app;
