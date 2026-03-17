// cypress/support/commands.js
// Commandes personnalisées réutilisables

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('[data-testid="input-email"]').clear().type(email)
  cy.get('[data-testid="input-password"]').clear().type(password)
  cy.get('[data-testid="btn-login"]').click()
  cy.get('[data-testid="tab-dashboard"]').should('be.visible')
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="btn-logout"]').click()
  cy.get('[data-testid="btn-login"]').should('be.visible')
})

Cypress.Commands.add('navigateTo', (tab) => {
  cy.get(`[data-testid="tab-${tab}"]`).click()
})