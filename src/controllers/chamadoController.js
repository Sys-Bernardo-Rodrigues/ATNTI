const ChamadoModel = require('../models/chamadoModel');
const NotificacaoModel = require('../models/notificacaoModel'); // NOVO

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
      
      // NOVO: Cria notificação para o usuário que abriu o chamado
      await NotificacaoModel.add({
          usuario_id: chamado.usuario_id,
          chamado_id: chamado.id,
          mensagem: `Seu chamado "${chamado.titulo}" foi aberto com sucesso.`
      });

      res.status(201).json(chamado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao criar chamado' });
    }
  },

  // ... (métodos index, search, show, update, delete) ...

  async atribuir(req, res) {
    try {
      const { id } = req.params;
      const { responsavel_id } = req.body;

      const chamadoExistente = await ChamadoModel.findById(id);
      if (!chamadoExistente) {
        return res.status(404).json({ erro: 'Chamado não encontrado' });
      }

      const chamadoAtualizado = await ChamadoModel.atribuirResponsavel(id, responsavel_id);

      // NOVO: Cria notificação para o novo responsável
      await NotificacaoModel.add({
          usuario_id: chamadoAtualizado.responsavel_id,
          chamado_id: chamadoAtualizado.id,
          mensagem: `Um novo chamado foi atribuído a você: "${chamadoAtualizado.titulo}".`
      });

      res.json(chamadoAtualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao atribuir chamado' });
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

  async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ erro: 'Parâmetro de busca "q" é obrigatório.' });
      }
      const chamados = await ChamadoModel.search(q);
      res.json(chamados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar chamados' });
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
      
      // NOVO: Notificação para o usuário que abriu o chamado quando ele é atualizado
      await NotificacaoModel.add({
        usuario_id: chamadoAtualizado.usuario_id,
        chamado_id: chamadoAtualizado.id,
        mensagem: `O chamado "${chamadoAtualizado.titulo}" foi atualizado.`
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