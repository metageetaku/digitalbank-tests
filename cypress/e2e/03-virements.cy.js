describe('💸 Virements Bancaires', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-transfer"]').click()
  })

  it('TC-VIR-001 : Virement interne réussi', () => {
    cy.get('[data-testid="btn-transfer-internal"]').click()
    cy.get('[data-testid="select-to-account"]').select(0)
    cy.get('[data-testid="input-amount"]').type('100')
    cy.get('[data-testid="input-description"]').type('Test virement')
    cy.get('[data-testid="btn-submit-transfer"]').click()
    cy.get('[data-testid="transfer-success"]').should('be.visible')
  })

  it('TC-VIR-002 : Erreur si solde insuffisant', () => {
    cy.get('[data-testid="btn-transfer-internal"]').click()
    cy.get('[data-testid="select-to-account"]').select(0)
    cy.get('[data-testid="input-amount"]').type('999999')
    cy.get('[data-testid="btn-submit-transfer"]').click()
    cy.get('[data-testid="transfer-error"]').should('be.visible')
      .and('contain.text', 'Solde insuffisant')
  })

  it('TC-VIR-003 : Erreur sans compte destinataire', () => {
    cy.get('[data-testid="btn-transfer-internal"]').click()
    cy.get('[data-testid="input-amount"]').type('100')
    cy.get('[data-testid="btn-submit-transfer"]').click()
    cy.get('[data-testid="transfer-error"]').should('be.visible')
  })

  it('TC-VIR-004 : Affichage des bénéficiaires', () => {
    cy.get('[data-testid="btn-transfer-external"]').click()
    cy.get('[data-testid="beneficiary-list"]').should('be.visible')
  })

  it('TC-VIR-005 : Ouverture modale ajout bénéficiaire', () => {
    cy.get('[data-testid="btn-transfer-external"]').click()
    cy.get('[data-testid="btn-add-beneficiary"]').click()
    cy.get('[data-testid="modal-add-beneficiary"]').should('be.visible')
  })

  it('TC-VIR-006 : Annulation ferme la modale', () => {
    cy.get('[data-testid="btn-transfer-external"]').click()
    cy.get('[data-testid="btn-add-beneficiary"]').click()
    cy.get('[data-testid="btn-cancel-beneficiary"]').click()
    cy.get('[data-testid="modal-add-beneficiary"]').should('not.be.visible')
  })
})