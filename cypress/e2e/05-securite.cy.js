describe('Sécurité', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-security"]').click()
  })

  it('TC-SEC-001 : Informations utilisateur affichées', () => {
    cy.get('[data-testid="user-name"]').should('contain.text', 'Utilisateur Test')
    cy.get('[data-testid="user-email"]').should('contain.text', 'test@digitalbank.fr')
  })

  it('TC-SEC-002 : Ouverture modale changement mot de passe', () => {
    cy.get('[data-testid="btn-change-password"]').click()
    cy.get('[data-testid="modal-change-password"]').should('be.visible')
  })

  it('TC-SEC-003 : Erreur si mot de passe actuel incorrect', () => {
    cy.get('[data-testid="btn-change-password"]').click()
    cy.get('[data-testid="input-current-password"]').type('MauvaisPass!')
    cy.get('[data-testid="input-new-password"]').type('NewPass@2025!')
    cy.get('[data-testid="input-confirm-password"]').type('NewPass@2025!')
    cy.get('[data-testid="btn-save-password"]').click()
    cy.get('[data-testid="password-error"]').should('be.visible')
  })

  it('TC-SEC-004 : Changement de mot de passe réussi', () => {
    cy.get('[data-testid="btn-change-password"]').click()
    cy.get('[data-testid="input-current-password"]').type('Test1234!')
    cy.get('[data-testid="input-new-password"]').type('NewPass@2025!')
    cy.get('[data-testid="input-confirm-password"]').type('NewPass@2025!')
    cy.get('[data-testid="btn-save-password"]').click()
    cy.get('[data-testid="security-success"]').should('be.visible')
  })

  it('TC-SEC-005 [RÉGRESSION] : Reconnexion après changement MDP', () => {
    cy.get('[data-testid="btn-change-password"]').click()
    cy.get('[data-testid="input-current-password"]').type('Test1234!')
    cy.get('[data-testid="input-new-password"]').type('NewPass@2025!')
    cy.get('[data-testid="input-confirm-password"]').type('NewPass@2025!')
    cy.get('[data-testid="btn-save-password"]').click()
    cy.get('[data-testid="security-success"]').should('be.visible')
    cy.get('[data-testid="btn-logout"]').click()
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('NewPass@2025!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-dashboard"]').should('be.visible')
  })

  it('TC-SEC-006 : Activation de la 2FA', () => {
  cy.get('[data-testid="toggle-2fa"]').then(($toggle) => {
    if (!$toggle.is(':checked')) {
      // force: true car le checkbox est caché par CSS (toggle switch)
      cy.wrap($toggle).click({ force: true })
      cy.get('[data-testid="security-success"]')
        .should('contain.text', 'activée')
      }
    })
  })
})