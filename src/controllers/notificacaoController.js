const NotificacaoModel = require('../models/notificacaoModel');

const NotificacaoController = {
  async list(req, res, next) {
    try {
      const usuario_id = req.usuario.id;
      const notificacoes = await NotificacaoModel.listByUsuario(usuario_id);
      res.json(notificacoes);
    } catch (err) {
      next(err);
    }
  },

  async marcarComoLida(req, res, next) {
    try {
      const { id } = req.params;
      const usuario_id = req.usuario.id;

      const notificacao = await NotificacaoModel.marcarComoLida(id, usuario_id);
      if (!notificacao) {
        return res.status(404).json({ erro: 'Notificação não encontrada ou acesso negado' });
      }

      res.status(200).json(notificacao);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = NotificacaoController;