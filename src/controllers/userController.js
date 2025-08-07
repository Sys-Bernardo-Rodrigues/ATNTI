const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const ChamadoModel = require('../models/chamadoModel');

const UserController = {
  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const hashed = await bcrypt.hash(senha, 10);
      const user = await UserModel.create({ nome, email, senha: hashed });
      res.status(201).json(user);
    } catch (err) {
      if (err.message === 'E-mail já cadastrado') {
        return res.status(400).json({ erro: err.message });
      }

      console.error(err);
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  },

  async index(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },

  async show(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  },

  async update(req, res) {
    try {
      const { nome, email } = req.body;

      const existente = await UserModel.findById(req.params.id);
      if (!existente) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const user = await UserModel.update(req.params.id, { nome, email });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  },
  
  async updateProfile(req, res) {
    try {
      const { id } = req.usuario;
      const { nome, email } = req.body;

      const user = await UserModel.update(id, { nome, email });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao atualizar o próprio perfil' });
    }
  },

  async updatePassword(req, res) {
    try {
      const { id } = req.usuario;
      const { senhaAntiga, novaSenha } = req.body;

      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const senhaValida = await bcrypt.compare(senhaAntiga, user.senha);
      if (!senhaValida) {
        return res.status(400).json({ erro: 'Senha antiga incorreta' });
      }

      const hashed = await bcrypt.hash(novaSenha, 10);
      await UserModel.updatePassword(id, hashed);

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao alterar a senha' });
    }
  },

  async delete(req, res) {
    try {
      const existente = await UserModel.findById(req.params.id);
      if (!existente) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      await UserModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
  },

  // NOVO: Retorna todos os chamados abertos por um usuário específico
  async getChamadosDoUsuario(req, res) {
    try {
      const { id } = req.params;
      const chamados = await ChamadoModel.findByUsuarioId(id);
      if (!chamados.length) {
        return res.status(404).json({ erro: 'Nenhum chamado encontrado para este usuário.' });
      }
      res.json(chamados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao buscar chamados do usuário.' });
    }
  }
};

module.exports = UserController;