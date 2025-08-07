const express = require('express');
const router = express.Router({ mergeParams: true });

const AnexoController = require('../controllers/anexoController');
const autenticarToken = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

router.post(
  '/',
  autenticarToken,
  upload.single('anexo'), // Middleware do multer para um único arquivo
  AnexoController.upload
);

router.get('/', autenticarToken, AnexoController.list);

router.get('/:id/download', autenticarToken, AnexoController.download);

module.exports = router;