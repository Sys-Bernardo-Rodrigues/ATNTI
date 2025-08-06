const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Atendimento T.I.',
    version: '1.0.0',
    description: 'Documentação da API de atendimento técnico interno',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // onde estão as anotações (YAML nos comentários)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
