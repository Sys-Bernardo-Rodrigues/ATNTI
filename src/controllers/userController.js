const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

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

      // Verifica existência do usuário
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
  
  // NOVO: Atualiza o perfil do próprio usuário
  async updateProfile(req, res) {
    try {
      const { id } = req.usuario; // Pega o ID do usuário do token
      const { nome, email } = req.body;

      const user = await UserModel.update(id, { nome, email });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao atualizar o próprio perfil' });
    }
  },

  // NOVO: Permite ao usuário logado alterar sua senha
  async updatePassword(req, res) {
    try {
      const { id } = req.usuario; // Pega o ID do usuário do token
      const { senhaAntiga, novaSenha } = req.body;

      const user = await UserModel.findById(id); // Busca o usuário para comparar a senha
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
  }
};

module.exports = UserController;