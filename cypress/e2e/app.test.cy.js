describe('Teste do funcionamento da aplicação', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Verifica os elementos iniciais da página', () => {
    cy.contains('Pokédex');
    cy.get('button').contains('Buscar');
    cy.contains('Busque seu Pokemon!');
  });

  it('Vetifica se ao buscar com um pokemon que não existe, há o retorno correto', () => {
    cy.get('input').type('abcde');
    cy.get('button').click();

    cy.contains('Pokemon não encontrado!');
  });

  it('Verifica se ao buscar um pokemon existente, as informações corretas são renderizadas', () => {
    cy.get('input').type('pikachu');
    cy.get('button').click();

    cy.get('h2').contains('PIKACHU');
    cy.get('p').contains('Id');
    cy.get('p').contains('altura');
    cy.get('p').contains('peso');
    cy.get('p').contains('Cor');
    cy.get('p').contains('Felicidade básica');
    cy.get('p').contains('Taxa de captura');
    cy.get('p').contains('Taxa de crescimento');
    cy.get('p').contains('Geração');
    cy.get('p').contains('Habitat');
    cy.get('p').contains('Habilidades');
    cy.get('p').contains('Estatísticas');
    cy.get('p').contains('Movimentos');
  });

  it('Verifica se ao buscar um pokemon existente, suas informações de evolução são carregadas', () => {
    cy.get('input').type('eevee');
    cy.get('button').click();

    cy.get('h2').contains('EEVEE');
    cy.get('h3').contains('EEVEE');
    cy.get('h3').contains('VAPOREON');
    cy.get('h3').contains('JOLTEON');
    cy.get('h3').contains('FLAREON');
    cy.get('h3').contains('ESPEON');
    cy.get('h3').contains('UMBREON');
    cy.get('h3').contains('LEAFEON');
    cy.get('h3').contains('GLACEON');
    cy.get('h3').contains('SYLVEON');
  });

});
