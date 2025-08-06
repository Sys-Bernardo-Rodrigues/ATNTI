const ChamadoModel = require('../models/chamadoModel');

const ChamadoController = {
  async create(req, res) {
    try {
      const { prioridade, titulo, descricao } = req.body;
      const usuario_id = req.usuario.id;

      const chamado = await ChamadoModel.create({
        usuario_id,
        prioridade,
        titulo,
        descricao
      });

      res.status(201).json(chamado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao criar chamado' });
    }
  },

  async index(req, res) {
    try {
      const chamados = await ChamadoModel.findAll();
      res.json(chamados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar chamados' });
    }
  },

  async show(req, res) {
    try {
      const chamado = await ChamadoModel.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }
      res.json(chamado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar chamado' });
    }
  },

  async update(req, res) {
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

      res.json(chamadoAtualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao atualizar chamado' });
    }
  },

  async delete(req, res) {
    try {
      const chamado = await ChamadoModel.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      await ChamadoModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao deletar chamado' });
    }
  }
};

module.exports = ChamadoController;
