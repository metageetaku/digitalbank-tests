describe('Paiement de Factures', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-bills"]').click()
  })

  it('TC-BILL-001 : Les factures en attente sont affichées', () => {
    cy.get('[data-testid="pending-bills"]').should('be.visible')
  })

  it('TC-BILL-002 : Chaque facture a un bouton Payer', () => {
    [1, 2, 3, 4].forEach((id) => {
      cy.get(`[data-testid="btn-pay-bill-${id}"]`).should('be.visible')
    })
  })

  it('TC-BILL-003 : Clic Payer ouvre la modale', () => {
    cy.get('[data-testid="btn-pay-bill-1"]').click()
    cy.get('[data-testid="modal-confirm-payment"]').should('be.visible')
  })

  it('TC-BILL-004 : La modale affiche le bon fournisseur', () => {
    cy.get('[data-testid="btn-pay-bill-1"]').click()
    cy.get('#payment-summary').should('contain.text', 'EDF')
  })

  it('TC-BILL-005 : Annulation ferme la modale sans payer', () => {
    cy.get('[data-testid="btn-pay-bill-1"]').click()
    cy.get('[data-testid="btn-cancel-payment"]').click()
    cy.get('[data-testid="modal-confirm-payment"]').should('not.be.visible')
  })
})