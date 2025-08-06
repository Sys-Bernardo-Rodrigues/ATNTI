const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validarRequisicao = require("../middlewares/validarRequisicao");
const schemaLogin = require("../validators/loginValidator");


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário e retorna token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

router.post("/login", validarRequisicao(schemaLogin), authController.login);

module.exports = router;
