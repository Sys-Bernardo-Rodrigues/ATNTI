const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const validarRequisicao = require("../middlewares/validarRequisicao");
const schemaUsuario = require("../validators/usuarioValidator");
const { autenticarToken, verificarAdmin } = require("../middlewares/autenticacao");

router.post(
  "/usuarios",
  autenticarToken,
  verificarAdmin,
  validarRequisicao(schemaUsuario),
  usuarioController.criarUsuario
);
