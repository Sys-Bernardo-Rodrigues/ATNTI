const multer = require('multer');
const path   = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Salva na pasta 'uploads' na raiz do projeto
  },
  filename: (req, file, cb) => {
    // Renomeia o arquivo para evitar conflitos, mantendo a extensão original
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    // Ajusta o limite para 20 MB (20 * 1024 * 1024 bytes)
    fileSize: 20 * 1024 * 1024
  },
});

module.exports = upload;