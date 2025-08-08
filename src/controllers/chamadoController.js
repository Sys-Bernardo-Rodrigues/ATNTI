const ChamadoModel = require('../models/chamadoModel');
const NotificacaoModel = require('../models/notificacaoModel');

const ChamadoController = {
  async create(req, res, next) {
    try {
      const { prioridade, titulo, descricao } = req.body;
      const usuario_id = req.usuario.id;

      const chamado = await ChamadoModel.create({
        usuario_id,
        prioridade,
        titulo,
        descricao
      });
      
      await NotificacaoModel.add({
          usuario_id: chamado.usuario_id,
          chamado_id: chamado.id,
          mensagem: `Seu chamado "${chamado.titulo}" foi aberto com sucesso.`
      });

      res.status(201).json(chamado);
    } catch (err) {
      next(err);
    }
  },

  async index(req, res, next) {
    try {
      const chamados = await ChamadoModel.findAll();
      res.json(chamados);
    } catch (err) {
      next(err);
    }
  },

  async search(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ erro: 'Parâmetro de busca "q" é obrigatório.' });
      }
      const chamados = await ChamadoModel.search(q);
      res.json(chamados);
    } catch (err) {
      next(err);
    }
  },

  async show(req, res, next) {
    try {
      const chamado = await ChamadoModel.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }
      res.json(chamado);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { prioridade, titulo, descricao } = req.body;

      const chamadoExistente = await ChamadoModel.findById(id);
      if (!chamadoExistente) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      const chamadoAtualizado = await ChamadoModel.update(id, {
        prioridade,
        titulo,
        descricao
      });
      
      await NotificacaoModel.add({
        usuario_id: chamadoAtualizado.usuario_id,
        chamado_id: chamadoAtualizado.id,
        mensagem: `O chamado "${chamadoAtualizado.titulo}" foi atualizado.`
      });

      res.json(chamadoAtualizado);
    } catch (err) {
      next(err);
    }
  },

  async atribuir(req, res, next) {
    try {
      const { id } = req.params;
      const { responsavel_id } = req.body;

      const chamadoExistente = await ChamadoModel.findById(id);
      if (!chamadoExistente) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      const chamadoAtualizado = await ChamadoModel.atribuirResponsavel(id, responsavel_id);

      await NotificacaoModel.add({
          usuario_id: chamadoAtualizado.responsavel_id,
          chamado_id: chamadoAtualizado.id,
          mensagem: `Um novo chamado foi atribuído a você: "${chamadoAtualizado.titulo}".`
      });

      res.json(chamadoAtualizado);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const chamado = await ChamadoModel.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      await ChamadoModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ChamadoController;