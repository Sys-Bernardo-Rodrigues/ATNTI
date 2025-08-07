const NotificacaoModel = require('../models/notificacaoModel');

const NotificacaoController = {
  // Lista todas as notificações de um usuário logado
  async list(req, res) {
    try {
      const usuario_id = req.usuario.id;
      const notificacoes = await NotificacaoModel.listByUsuario(usuario_id);
      res.json(notificacoes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar notificações' });
    }
  },

  // Marca uma notificação específica como lida
  async marcarComoLida(req, res) {
    try {
      const { id } = req.params;
      const usuario_id = req.usuario.id;

      const notificacao = await NotificacaoModel.marcarComoLida(id, usuario_id);
      if (!notificacao) {
        return res.status(404).json({ erro: 'Notificação não encontrada ou acesso negado' });
      }

      res.status(200).json(notificacao);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao marcar notificação como lida' });
    }
  }
};

module.exports = NotificacaoController;