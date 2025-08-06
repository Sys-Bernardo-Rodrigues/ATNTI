const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const autenticarToken = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/isAdmin');
const validarRequisicao = require('../middlewares/validarRequisicao');
const { schemaUsuarioCreate, schemaUsuarioUpdate } = require('../validators/usuarioValidator');

// 🔒 Apenas admin pode criar usuários
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário (apenas administradores)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, tipo]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [comum, admin]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou e-mail duplicado
 *       403:
 *         description: Acesso negado
 */

router.post('/', autenticarToken, verificarAdmin, validarRequisicao(schemaUsuarioCreate), UserController.create);

// Protegidas
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários (admin)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       403:
 *         description: Acesso negado
 */
router.get('/', autenticarToken, UserController.index);


router.get('/:id', autenticarToken, UserController.show);

// 🛠️ Validação Joi aplicada no update
router.put('/:id', autenticarToken, validarRequisicao(schemaUsuarioUpdate), UserController.update);

router.delete('/:id', autenticarToken, UserController.delete);

module.exports = router;
