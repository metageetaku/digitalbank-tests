describe('🏦 Dashboard — Comptes & Transactions', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-dashboard"]').should('be.visible')
  })

  it('TC-DASH-001 : Les cartes de compte sont affichées', () => {
    cy.get('[data-testid="balance-cards"]').should('be.visible')
  })

  it('TC-DASH-002 : Les soldes contiennent des chiffres', () => {
    cy.get('[data-testid="balance-4"]')
      .should('be.visible')
      .invoke('text')
      .should('match', /\d/)
  })

  it('TC-DASH-003 : La liste des transactions est visible', () => {
    cy.get('[data-testid="transaction-list"]').should('be.visible')
  })

  it('TC-DASH-004 : Sélection d\'un compte affiche ses transactions', () => {
    cy.get('[data-testid="account-card-5"]').click()
    cy.get('[data-testid="transaction-list"]').should('be.visible')
  })

  it('TC-DASH-005 : Le solde total est affiché', () => {
    cy.get('.total-balance').should('be.visible')
      .invoke('text').should('match', /\d/)
  })
})