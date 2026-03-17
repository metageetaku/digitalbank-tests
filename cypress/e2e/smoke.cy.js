// cypress/e2e/smoke.cy.js
// Smoke test : vérifie que l'application répond correctement
// Exécuté avant chaque déploiement

describe('🔥 Smoke Tests — DigitalBank', () => {

  it('La page de login se charge correctement', () => {
    cy.visit('/');
    cy.get('[data-testid="input-email"]').should('be.visible');
    cy.get('[data-testid="input-password"]').should('be.visible');
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });

  it('Connexion avec les identifiants de test', () => {
    cy.login('test@digitalbank.fr', 'Test1234!');
    cy.get('[data-testid="tab-dashboard"]').should('be.visible');
  });

  it('Le dashboard affiche les comptes', () => {
    cy.login('test@digitalbank.fr', 'Test1234!');
    cy.get('[data-testid="balance-cards"]').should('be.visible');
  });

  it('Déconnexion fonctionne', () => {
    cy.login('test@digitalbank.fr', 'Test1234!');
    cy.get('[data-testid="btn-logout"]').click();
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });

});