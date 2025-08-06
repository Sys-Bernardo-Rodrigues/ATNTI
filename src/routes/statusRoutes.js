const express = require('express');
const router = express.Router({ mergeParams: true });

const StatusController = require('../controllers/statusController');
const autenticarToken = require('../middlewares/authMiddleware');
const validarRequisicao = require('../middlewares/validarRequisicao');
const schemaStatus = require('../validators/statusValidator');

// Criar novo status para o chamado
/**
 * @swagger
 * /chamados/{chamado_id}/status:
 *   post:
 *     summary: Registra um novo status para um chamado
 *     tags: [Status]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: chamado_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status, comentario]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [em atendimento, pausado, finalizado]
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Status registrado com sucesso
 *       400:
 *         description: Chamado já finalizado ou dados inválidos
 */

router.post('/', autenticarToken, validarRequisicao(schemaStatus), StatusController.create);

// Listar todos os status de um chamado
router.get('/', autenticarToken, StatusController.list);

// Obter o status atual do chamado
router.get('/atual', autenticarToken, StatusController.getStatusAtual);

module.exports = router;
