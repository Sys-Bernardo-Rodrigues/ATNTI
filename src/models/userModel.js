const db = require('../config/db');

const UserModel = {
  async create({ nome, email, senha }) {
    // Verifica se o e-mail já está cadastrado
    const emailExistente = await db.query(
      'SELECT id FROM usuarios WHERE email = $1',
      [email]
    );
    if (emailExistente.rowCount > 0) {
      throw new Error('E-mail já cadastrado');
    }

    const query = `
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email
    `;
    const values = [nome, email, senha];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT id, nome, email, tipo FROM usuarios');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT id, nome, email, senha FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, { nome, email }) {
    const result = await db.query(
      'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email',
      [nome, email, id]
    );
    return result.rows[0];
  },
  
  // NOVO: Método para atualizar apenas a senha
  async updatePassword(id, novaSenha) {
    await db.query(
      'UPDATE usuarios SET senha = $1 WHERE id = $2',
      [novaSenha, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
  }
};

module.exports = UserModel;