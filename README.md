# Sistema de Atendimento T.I.

Uma API RESTful para um sistema de atendimento técnico interno, onde usuários podem abrir e gerenciar chamados de suporte. O sistema inclui funcionalidades de autenticação, gestão de usuários com diferentes níveis de acesso, gestão de chamados, atualização de status, adição de comentários e upload de anexos.

### Tecnologias

* **Node.js**: Ambiente de execução JavaScript no lado do servidor.
* **Express**: Framework web para construir a API.
* **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
* **`dotenv`**: Para gerenciar variáveis de ambiente.
* **`bcrypt`**: Para criptografia de senhas.
* **`jsonwebtoken`**: Para autenticação baseada em JWT.
* **`Joi`**: Para validação de dados de requisição.
* **`Swagger-jsdoc` & `swagger-ui-express`**: Para gerar e servir a documentação interativa da API.
* **`multer`**: Middleware para lidar com upload de arquivos.

### Estrutura do Projeto
```
A arquitetura do projeto segue um padrão MVC (Model-View-Controller), com uma organização clara das responsabilidades:
.
├── node_modules/
├── src/
│   ├── config/             # Configurações de banco de dados, Swagger, Multer
│   │   ├── db.js           # Conexão com PostgreSQL
│   │   ├── multer.js       # Configuração do Multer para upload de arquivos
│   │   └── swagger.js      # Configuração da documentação Swagger
│   │
│   ├── controllers/        # Lógica de negócio da aplicação
│   │   ├── anexoController.js  # Lógica para upload e download de anexos
│   │   ├── authController.js   # Lógica de login e geração de token
│   │   ├── chamadoController.js# Lógica para gerenciar chamados
│   │   ├── statusController.js # Lógica para gerenciar status de chamados
│   │   └── userController.js   # Lógica para gerenciar usuários
│   │
│   ├── middlewares/        # Middlewares para autenticação e validação
│   │   ├── authMiddleware.js   # Validação de token JWT
│   │   ├── isAdmin.js          # Verificação de permissão de administrador
│   │   └── validarRequisicao.js# Validação de schemas Joi
│   │
│   ├── models/             # Interação com o banco de dados
│   │   ├── anexoModel.js   # Métodos para gerenciar anexos
│   │   ├── chamadoModel.js # Métodos para gerenciar chamados
│   │   ├── statusModel.js  # Métodos para gerenciar status e comentários
│   │   └── userModel.js    # Métodos para gerenciar usuários
│   │
│   ├── routes/             # Definição dos endpoints da API
│   │   ├── anexoRoutes.js  # Rotas para anexos de chamados
│   │   ├── authRoutes.js   # Rota de login
│   │   ├── chamadoRoutes.js# Rotas para chamados
│   │   ├── statusRoutes.js # Rotas para status de chamados
│   │   └── userRoutes.js   # Rotas para usuários e perfil
│   │
│   └── validators/         # Schemas de validação Joi
│       ├── chamadoValidator.js  # Validação de chamados
│       ├── loginValidator.js    # Validação de login
│       ├── statusValidator.js   # Validação de status
│       └── usuarioValidator.js  # Validação de usuários
│
├── .env                    # Variáveis de ambiente
├── index.js                # Ponto de entrada da aplicação
├── package.json
└── README.md
```

### Funcionalidades

* **Autenticação**:
    * `POST /login`: Autentica o usuário e retorna um token JWT.
* **Gerenciamento de Usuários**:
    * `POST /usuarios`: Cria um novo usuário (apenas administradores).
    * `GET /usuarios`: Lista todos os usuários (apenas administradores).
    * `PUT /perfil`: Permite que o usuário logado atualize suas próprias informações.
    * `PUT /perfil/senha`: Permite que o usuário logado altere sua senha, verificando a senha antiga.
* **Gerenciamento de Chamados**:
    * `POST /chamados`: Cria um novo chamado.
    * `PUT /chamados/{id}/atribuir`: Atribui um chamado a um usuário (apenas administradores).
* **Status e Comentários**:
    * `POST /chamados/{chamado_id}/status`: Adiciona um novo status ou comentário a um chamado.
* **Anexos**:
    * `POST /chamados/{chamado_id}/anexos`: Faz o upload de um arquivo para um chamado.
    * `GET /chamados/{chamado_id}/anexos`: Lista todos os anexos de um chamado.
    * `GET /chamados/{chamado_id}/anexos/{id}/download`: Faz o download de um anexo específico.

### Configuração e Execução

1.  **Clone o repositório:**
    ```sh
    git clone [url_do_seu_repositorio]
    cd ATNTI
    ```
2.  **Instale as dependências:**
    ```sh
    npm install
    ```
3.  **Configure o banco de dados:**
    * Crie um banco de dados PostgreSQL.
    * Crie as tabelas `usuarios`, `chamados`, `chamado_status` e `chamado_anexos`.
4.  **Crie o arquivo `.env`:**
    * Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
        ```
        DATABASE_URL="sua_string_de_conexao_postgresql"
        JWT_SECRET="sua_chave_secreta"
        JWT_EXPIRES_IN="1d"
        PORT=3000
        ```
5.  **Crie o diretório de uploads:**
    ```sh
    mkdir uploads
    ```
6.  **Inicie o servidor:**
    ```sh
    node src/index.js
    ```
    O servidor estará rodando em `http://localhost:3000`.

### Documentação da API

A documentação interativa da API está disponível no endpoint `/docs`.
Após iniciar o servidor, acesse `http://localhost:3000/docs` para explorar e testar todos os endpoints.
