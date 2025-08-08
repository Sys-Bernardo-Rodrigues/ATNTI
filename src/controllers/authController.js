const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const AuthController = {
  async login(req, res, next) {
    const { email, senha } = req.body;

    try {
      const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Email ou senha inválidos' });
      }

      const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            tipo: user.tipo
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
      next(err);
    }
  }
};

module.exports = AuthController;