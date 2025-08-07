const express            = require('express');
const router             = express.Router();

const ChamadoController  = require('../controllers/chamadoController');
const autenticarToken    = require('../middlewares/authMiddleware');
const validarRequisicao  = require('../middlewares/validarRequisicao');
const verificarAdmin     = require('../middlewares/isAdmin');
const {
  schemaChamadoCreate,
  schemaChamadoUpdate,
  schemaChamadoAtribuir,
} = require('../validators/chamadoValidator');

/**
 * @swagger
 * tags:
 *   - name: Chamados
 *     description: Endpoints para gestão de chamados de TI
 *
 * paths:
 *   /chamados:
 *     post:
 *       summary: Cria um novo chamado
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NovoChamado'
 *       responses:
 *         '201': { description: Chamado criado com sucesso }
 *         '400': { description: Dados inválidos }
 *
 *     get:
 *       summary: Lista todos os chamados
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200': { description: Lista de chamados }
 *
 *   /chamados/{id}:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *
 *     get:
 *       summary: Obtém detalhes de um chamado
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200': { description: Dados do chamado }
 *         '404': { description: Chamado não encontrado }
 *
 *     put:
 *       summary: Atualiza um chamado existente
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AtualizarChamado'
 *       responses:
 *         '200': { description: Chamado atualizado }
 *         '404': { description: Chamado não encontrado }
 *
 *     delete:
 *       summary: Remove um chamado
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '204': { description: Chamado deletado }
 *         '404': { description: Chamado não encontrado }
 *
 *   /chamados/{id}/atribuir:
 *     put:
 *       summary: Atribui um chamado a um usuário responsável (apenas admin)
 *       tags: [Chamados]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema: { type: integer }
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [responsavel_id]
 *               properties:
 *                 responsavel_id: { type: integer }
 *       responses:
 *         '200': { description: Chamado atribuído com sucesso }
 *         '403': { description: Acesso negado }
 *         '404': { description: Chamado não encontrado }
 *
 * components:
 *   schemas:
 *     NovoChamado:
 *       type: object
 *       required: [titulo, descricao, prioridade]
 *       properties:
 *         titulo:     { type: string }
 *         descricao:  { type: string }
 *         prioridade: { type: string, enum: [baixa, media, alta] }
 *
 *     AtualizarChamado:
 *       allOf:
 *         - $ref: '#/components/schemas/NovoChamado'
 */

 /* ---------- Rotas ---------- */

 // Criar chamado
 router.post(
   '/',
   autenticarToken,
   validarRequisicao(schemaChamadoCreate),
   ChamadoController.create
 );

 // Listar chamados
 router.get('/', autenticarToken, ChamadoController.index);

 // Obter chamado por ID
 router.get('/:id', autenticarToken, ChamadoController.show);

 // Atualizar chamado
 router.put(
   '/:id',
   autenticarToken,
   validarRequisicao(schemaChamadoUpdate),
   ChamadoController.update
 );

 // Deletar chamado
 router.delete('/:id', autenticarToken, ChamadoController.delete);

 // Atribuir chamado (admin)
 router.put(
   '/:id/atribuir',
   autenticarToken,
   verificarAdmin,
   validarRequisicao(schemaChamadoAtribuir),
   ChamadoController.atribuir
 );

module.exports = router;
