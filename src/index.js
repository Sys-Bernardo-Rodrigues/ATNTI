const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// ============================
// 📚 Documentação Swagger
// ============================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================
// 🔐 Rotas protegidas e públicas
// ============================

// Rotas de autenticação (login)
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

// Rotas de usuários (protegidas com middleware nas rotas)
const userRoutes = require('./routes/userRoutes');
app.use('/usuarios', userRoutes);

// Rotas de chamados
const chamadoRoutes = require('./routes/chamadoRoutes');
app.use('/chamados', chamadoRoutes);

// Sub-rotas de status dos chamados
const statusRoutes = require('./routes/statusRoutes');
app.use('/chamados/:chamado_id/status', statusRoutes);

// NOVO: Sub-rotas para anexos de chamados
const anexoRoutes = require('./routes/anexoRoutes');
app.use('/chamados/:chamado_id/anexos', anexoRoutes);

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
// ❗Erro interno (opcional)
// ============================
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ erro: 'Erro interno do servidor.' });
// });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});