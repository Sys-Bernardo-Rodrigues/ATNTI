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

const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/usuarios', userRoutes);

const chamadoRoutes = require('./routes/chamadoRoutes');
app.use('/chamados', chamadoRoutes);

const statusRoutes = require('./routes/statusRoutes');
app.use('/chamados/:chamado_id/status', statusRoutes);

const anexoRoutes = require('./routes/anexoRoutes');
app.use('/chamados/:chamado_id/anexos', anexoRoutes);

const notificacaoRoutes = require('./routes/notificacaoRoutes');
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
// ❗Erro interno (NOVO)
// ============================
const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});