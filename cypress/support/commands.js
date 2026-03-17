// cypress/support/commands.js
// Commande réutilisable pour se connecter rapidement

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.get('[data-testid="input-email"]').type(email);
  cy.get('[data-testid="input-password"]').type(password);
  cy.get('[data-testid="btn-login"]').click();
  cy.get('[data-testid="tab-dashboard"]').should('be.visible');
});