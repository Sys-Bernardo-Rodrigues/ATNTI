const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // novo caminho — não use server.js

chai.use(chaiHttp);
const { expect } = chai;

// Exemplo de teste:
describe('Auth', () => {
  it('deve logar com credenciais válidas', async () => {
    const res = await chai.request(app)
      .post('/login')
      .send({ email: 'teste@teste.com', senha: 'teste123' });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });
});
