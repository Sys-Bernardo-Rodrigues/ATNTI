const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const autenticarToken = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/isAdmin');
const validarRequisicao = require('../middlewares/validarRequisicao');
const { schemaUsuarioCreate, schemaUsuarioUpdate, schemaSenhaUpdate } = require('../validators/usuarioValidator');

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Endpoints para gerenciamento de usuários (restrito a administradores)
 *   - name: Perfil
 *     description: Endpoints para o usuário gerenciar seu próprio perfil
 *
 * paths:
 *   /usuarios:
 *     post:
 *       summary: Cadastra um novo usuário (apenas administradores)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [nome, email, senha, tipo]
 *               properties:
 *                 nome:  { type: string }
 *                 email: { type: string }
 *                 senha: { type: string }
 *                 tipo:
 *                   type: string
 *                   enum: [comum, admin]
 *       responses:
 *         '201': { description: Usuário criado com sucesso }
 *         '400': { description: Dados inválidos ou e-mail duplicado }
 *         '403': { description: Acesso negado }
 *
 *     get:
 *       summary: Lista todos os usuários (admin)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200': { description: Lista de usuários }
 *         '403': { description: Acesso negado }
 *
 *   /usuarios/{id}:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *
 *     get:
 *       summary: Obtém um usuário por ID (admin)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200': { description: Dados do usuário }
 *         '403': { description: Acesso negado }
 *         '404': { description: Usuário não encontrado }
 *
 *     put:
 *       summary: Atualiza um usuário existente (admin)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [nome, email]
 *               properties:
 *                 nome:  { type: string }
 *                 email: { type: string }
 *       responses:
 *         '200': { description: Usuário atualizado }
 *         '403': { description: Acesso negado }
 *         '404': { description: Usuário não encontrado }
 *
 *     delete:
 *       summary: Deleta um usuário por ID (admin)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '204': { description: Usuário deletado com sucesso }
 *         '403': { description: Acesso negado }
 *         '404': { description: Usuário não encontrado }
 *
 *   /usuarios/{id}/chamados:
 *     get:
 *       summary: Lista todos os chamados abertos por um usuário (admin)
 *       tags: [Usuários]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema: { type: integer }
 *           description: ID do usuário para buscar os chamados
 *       responses:
 *         '200': { description: Lista de chamados do usuário }
 *         '404': { description: Nenhum chamado encontrado para este usuário }
 *         '403': { description: Acesso negado }
 *
 *   /perfil:
 *     put:
 *       summary: Atualiza o perfil do usuário logado
 *       tags: [Perfil]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [nome, email]
 *               properties:
 *                 nome:  { type: string }
 *                 email: { type: string }
 *       responses:
 *         '200': { description: Perfil atualizado com sucesso }
 *         '401': { description: Não autorizado }
 *
 *   /perfil/senha:
 *     put:
 *       summary: Altera a senha do usuário logado
 *       tags: [Perfil]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [senhaAntiga, novaSenha]
 *               properties:
 *                 senhaAntiga: { type: string }
 *                 novaSenha:   { type: string }
 *       responses:
 *         '204': { description: Senha alterada com sucesso }
 *         '400': { description: Senha antiga incorreta ou dados inválidos }
 *         '401': { description: Não autorizado }
 */

router.post('/', autenticarToken, verificarAdmin, validarRequisicao(schemaUsuarioCreate), UserController.create);
router.get('/', autenticarToken, verificarAdmin, UserController.index);
router.get('/:id', autenticarToken, verificarAdmin, UserController.show);
router.put('/:id', autenticarToken, verificarAdmin, validarRequisicao(schemaUsuarioUpdate), UserController.update);
router.delete('/:id', autenticarToken, verificarAdmin, UserController.delete);
router.put('/perfil', autenticarToken, validarRequisicao(schemaUsuarioUpdate), UserController.updateProfile);
router.put('/perfil/senha', autenticarToken, validarRequisicao(schemaSenhaUpdate), UserController.updatePassword);
// NOVO: Rota para buscar os chamados de um usuário
router.get('/:id/chamados', autenticarToken, verificarAdmin, UserController.getChamadosDoUsuario);

module.exports = router;