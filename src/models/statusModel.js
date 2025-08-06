const db = require('../config/db');

const StatusModel = {
  async add({ chamado_id, status, comentario, usuario_id }) {
    const query = `
      INSERT INTO chamado_status (chamado_id, status, comentario, usuario_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [chamado_id, status, comentario, usuario_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listByChamado(chamado_id) {
    const result = await db.query(`
      SELECT s.*, u.nome AS nome_usuario
      FROM chamado_status s
      LEFT JOIN usuarios u ON u.id = s.usuario_id
      WHERE chamado_id = $1
      ORDER BY data_hora ASC
    `, [chamado_id]);
    return result.rows;
  },
  
  async getUltimoStatus(chamado_id) {
    const result = await db.query(`
      SELECT s.*, u.nome AS nome_usuario
      FROM chamado_status s
      LEFT JOIN usuarios u ON u.id = s.usuario_id
      WHERE chamado_id = $1
      ORDER BY data_hora DESC
      LIMIT 1
    `, [chamado_id]);
    return result.rows[0];
  },

  async verificarChamado(chamado_id) {
    const result = await db.query(`
      SELECT 1 FROM chamados WHERE id = $1
    `, [chamado_id]);
    return result.rowCount > 0;
  }
};

module.exports = StatusModel;
