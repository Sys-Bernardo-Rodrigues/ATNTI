const express = require('express');
const router = express.Router();

const NotificacaoController = require('../controllers/notificacaoController');
const autenticarToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Notificações
 *     description: Endpoints para gerenciar notificações do usuário
 *
 * paths:
 *   /notificacoes:
 *     get:
 *       summary: Lista todas as notificações do usuário logado
 *       tags: [Notificações]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200': { description: Lista de notificações }
 *         '401': { description: Não autorizado }
 *
 *   /notificacoes/{id}/lida:
 *     put:
 *       summary: Marca uma notificação como lida
 *       tags: [Notificações]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema: { type: integer }
 *           description: ID da notificação
 *       responses:
 *         '200': { description: Notificação marcada como lida }
 *         '401': { description: Não autorizado }
 *         '404': { description: Notificação não encontrada }
 */


// Listar notificações do usuário logado
router.get('/', autenticarToken, NotificacaoController.list);

// Marcar notificação como lida
router.put('/:id/lida', autenticarToken, NotificacaoController.marcarComoLida);

module.exports = router;