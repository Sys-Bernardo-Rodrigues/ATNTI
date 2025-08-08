const StatusModel = require('../models/statusModel');
const NotificacaoModel = require('../models/notificacaoModel');

const StatusController = {
  async create(req, res, next) {
    try {
      const { chamado_id } = req.params;
      const { status, comentario } = req.body;
      const usuario_id = req.usuario.id;

      const chamadoExiste = await StatusModel.verificarChamado(chamado_id);
      if (!chamadoExiste) {
        return res.status(404).json({ erro: 'Chamado não encontrado.' });
      }

      const ultimoStatus = await StatusModel.getUltimoStatus(chamado_id);
      if (ultimoStatus && ultimoStatus.status === 'finalizado') {
        return res.status(400).json({
          erro: 'Este chamado já está finalizado. Não é possível alterar o status.'
        });
      }

      const novoStatus = await StatusModel.add({
        chamado_id,
        status,
        comentario,
        usuario_id
      });
      
      const chamado = await StatusModel.findChamadoById(chamado_id);
      if (chamado) {
        await NotificacaoModel.add({
          usuario_id: chamado.usuario_id,
          chamado_id: chamado.id,
          mensagem: `O status do seu chamado "${chamado.titulo}" foi alterado para "${status}".`
        });
      }
      
      res.status(201).json(novoStatus);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const { chamado_id } = req.params;
      const historico = await StatusModel.listByChamado(chamado_id);
      res.json(historico);
    } catch (err) {
      next(err);
    }
  },

  async getStatusAtual(req, res, next) {
    try {
      const { chamado_id } = req.params;
      const status = await StatusModel.getUltimoStatus(chamado_id);
      if (!status) {
        return res.status(404).json({ erro: 'Chamado sem status registrado.' });
      }
      res.json(status);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = StatusController;