const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const AuthController = {
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      // Buscar usuário pelo email
      const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      // Comparar senha
      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            tipo: user.tipo // incluído aqui
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );

      res.json({
        token,
        usuario: {
          id: user.id,
          nome: user.nome,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao processar login' });
    }
  }
};

module.exports = AuthController;
