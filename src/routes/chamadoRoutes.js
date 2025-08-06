const express = require('express');
const router = express.Router();

const ChamadoController = require('../controllers/chamadoController');
const autenticarToken = require('../middlewares/authMiddleware');
const validarRequisicao = require('../middlewares/validarRequisicao');
const { schemaChamadoCreate, schemaChamadoUpdate } = require('../validators/chamadoValidator');

/**
 * @swagger
 * /chamados:
 *   post:
 *     summary: Cria um novo chamado
 *     tags: [Chamados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [prioridade, titulo, descricao]
 *             properties:
 *               prioridade:
 *                 type: string
 *                 enum: [baixa, média, alta]
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chamado criado
 *       400:
 *         description: Dados inválidos
 */

// Criar chamado
router.post('/', autenticarToken, validarRequisicao(schemaChamadoCreate), ChamadoController.create);

// Listar chamados
router.get('/', autenticarToken, ChamadoController.index);

// Obter chamado por ID
router.get('/:id', autenticarToken, ChamadoController.show);

// Atualizar chamado
/**
 * @swagger
 * /chamados/{id}:
 *   put:
 *     summary: Atualiza um chamado existente
 *     tags: [Chamados]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *             required: [prioridade, titulo, descricao]
 *             properties:
 *               prioridade:
 *                 type: string
 *                 enum: [baixa, média, alta]
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chamado atualizado
 *       404:
 *         description: Chamado não encontrado
 */

router.put('/:id', autenticarToken, validarRequisicao(schemaChamadoUpdate), ChamadoController.update);

// Deletar chamado
router.delete('/:id', autenticarToken, ChamadoController.delete);

module.exports = router;
