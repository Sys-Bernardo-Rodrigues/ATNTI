const db = require('../config/db');

const NotificacaoModel = {
  async add({ usuario_id, chamado_id, mensagem }) {
    const query = `
      INSERT INTO notificacoes (usuario_id, chamado_id, mensagem)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [usuario_id, chamado_id, mensagem];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listByUsuario(usuario_id) {
    const result = await db.query(
      `SELECT * FROM notificacoes WHERE usuario_id = $1 ORDER BY criado_em DESC`,
      [usuario_id]
    );
    return result.rows;
  },

  async marcarComoLida(notificacao_id, usuario_id) {
    const result = await db.query(
      `UPDATE notificacoes SET lida = TRUE WHERE id = $1 AND usuario_id = $2 RETURNING *`,
      [notificacao_id, usuario_id]
    );
    return result.rows[0];
  }
};

module.exports = NotificacaoModel;