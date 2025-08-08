const AnexoModel = require('../models/anexoModel');
const path       = require('path');
const fs         = require('fs');

const AnexoController = {
  async upload(req, res, next) {
    try {
      const { chamado_id } = req.params;
      
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
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const { chamado_id } = req.params;
      const anexos = await AnexoModel.findByChamado(chamado_id);
      res.json(anexos);
    } catch (err) {
      next(err);
    }
  },

  async download(req, res, next) {
    try {
      const anexo = await AnexoModel.findById(req.params.id);
      if (!anexo) {
        return res.status(404).json({ erro: 'Anexo não encontrado' });
      }

      const filePath = path.resolve(anexo.caminho);
      res.download(filePath, anexo.nome_arquivo, (err) => {
        if (err) {
          next(err);
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = AnexoController;