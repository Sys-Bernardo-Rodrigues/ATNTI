const db = require('../config/db');

// Gera um protocolo sequencial tipo ATN0001, ATN0002...
async function gerarProtocolo() {
  const result = await db.query('SELECT MAX(id) AS max_id FROM chamados');
  const numero = (result.rows[0].max_id || 0) + 1;
  return `ATN${numero.toString().padStart(4, '0')}`;
}

const ChamadoModel = {
  async create({ usuario_id, prioridade, titulo, descricao }) {
    const protocolo = await gerarProtocolo();
    const query = `
      INSERT INTO chamados (protocolo, usuario_id, prioridade, titulo, descricao)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [protocolo, usuario_id, prioridade, titulo, descricao];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(`
      SELECT c.*, u.nome AS nome_usuario
      FROM chamados c
      JOIN usuarios u ON c.usuario_id = u.id
      ORDER BY c.aberto_em DESC
    `);
    return result.rows;
  },

  async search(query) {
    const termo = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM chamados
       WHERE titulo ILIKE $1 OR descricao ILIKE $1 OR protocolo ILIKE $1`,
      [termo]
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(`
      SELECT c.*, u.nome AS nome_usuario
      FROM chamados c
      JOIN usuarios u ON c.usuario_id = u.id
      WHERE c.id = $1
    `, [id]);
    return result.rows[0];
  },
  
  // NOVO: Busca todos os chamados de um usuário
  async findByUsuarioId(usuario_id) {
    const result = await db.query(
      `SELECT c.* FROM chamados c WHERE usuario_id = $1 ORDER BY c.aberto_em DESC`,
      [usuario_id]
    );
    return result.rows;
  },

  async update(id, { prioridade, titulo, descricao }) {
    const result = await db.query(
      `UPDATE chamados
       SET prioridade = $1,
           titulo = $2,
           descricao = $3
       WHERE id = $4
       RETURNING *`,
      [prioridade, titulo, descricao, id]
    );
    return result.rows[0];
  },

  async atribuirResponsavel(id, responsavel_id) {
    const result = await db.query(
      `UPDATE chamados
       SET responsavel_id = $1
       WHERE id = $2
       RETURNING *`,
      [responsavel_id, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM chamados WHERE id = $1', [id]);
  }
};

module.exports = ChamadoModel;