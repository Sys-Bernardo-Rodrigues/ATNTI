const AnexoModel = require('../models/anexoModel');
const path       = require('path');
const fs         = require('fs');

const AnexoController = {
  async upload(req, res) {
    try {
      const { chamado_id } = req.params;
      
      // ✅ NOVO: Verificação para garantir que o arquivo foi enviado
      if (!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo foi enviado.' });
      }

      const { filename, originalname, size, path: filePath } = req.file;
      const usuario_id = req.usuario.id;

      const anexo = await AnexoModel.add(
        chamado_id,
        originalname,
        filePath,
        size,
        usuario_id
      );

      res.status(201).json({
        mensagem: 'Anexo adicionado com sucesso',
        anexo
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao fazer upload do anexo' });
    }
  },

  async list(req, res) {
    try {
      const { chamado_id } = req.params;
      const anexos = await AnexoModel.findByChamado(chamado_id);
      res.json(anexos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao listar anexos' });
    }
  },

  async download(req, res) {
    try {
      const anexo = await AnexoModel.findById(req.params.id);
      if (!anexo) {
        return res.status(404).json({ erro: 'Anexo não encontrado' });
      }

      const filePath = path.resolve(anexo.caminho);
      res.download(filePath, anexo.nome_arquivo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro ao baixar o anexo' });
    }
  }
};

module.exports = AnexoController;