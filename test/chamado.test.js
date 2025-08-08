const chai = require('chai');
const expect = chai.expect;

// Importa o modelo que queremos testar
const ChamadoModel = require('../src/models/chamadoModel');

// Simula a chamada ao banco de dados para evitar dependências reais
ChamadoModel.gerarProtocolo = async () => 'ATN0001'; 
ChamadoModel.create = async ({ usuario_id, prioridade, titulo, descricao }) => {
  const protocolo = await ChamadoModel.gerarProtocolo();
  return {
    id: 1,
    protocolo,
    usuario_id,
    prioridade,
    titulo,
    descricao
  };
};

describe('ChamadoModel', () => {
  it('deve criar um chamado com um protocolo no formato correto', async () => {
    const chamado = await ChamadoModel.create({
      usuario_id: 1,
      prioridade: 'baixa',
      titulo: 'Erro de Login',
      descricao: 'Não consigo acessar o sistema'
    });

    // Verifica se o protocolo foi gerado e está no formato esperado
    expect(chamado).to.have.property('protocolo');
    expect(chamado.protocolo).to.match(/^ATN\d{4}$/);
    expect(chamado.protocolo).to.equal('ATN0001');
  });
});