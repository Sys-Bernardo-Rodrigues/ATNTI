const db = require('../config/db');

const AnexoModel = {
  async add(chamado_id, nome_arquivo, caminho, tamanho, usuario_id) {
    const query = `
      INSERT INTO chamado_anexos (chamado_id, nome_arquivo, caminho, tamanho, usuario_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [chamado_id, nome_arquivo, caminho, tamanho, usuario_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findByChamado(chamado_id) {
    const result = await db.query(
      `SELECT * FROM chamado_anexos WHERE chamado_id = $1`,
      [chamado_id]
    );
    return result.rows;
  },
  
  async findById(id) {
    const result = await db.query(
      `SELECT * FROM chamado_anexos WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }
};

module.exports = AnexoModel;