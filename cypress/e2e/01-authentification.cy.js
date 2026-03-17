describe('Authentification', () => {

  let users

  before(() => {
    cy.fixture('testData').then((data) => {
      users = data.users
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('TC-AUTH-001 : Connexion avec identifiants valides', () => {
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="tab-dashboard"]').should('be.visible')
  })

  it('TC-AUTH-002 : Erreur avec email inconnu', () => {
    cy.get('[data-testid="input-email"]').type('inconnu@email.com')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="login-error"]').should('be.visible')
  })

  it('TC-AUTH-003 : Erreur avec mot de passe incorrect', () => {
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('MauvaisPass!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="login-error"]').should('be.visible')
  })

  it('TC-AUTH-004 : Message erreur absent avant soumission', () => {
    cy.get('[data-testid="login-error"]').should('not.be.visible')
  })

  it('TC-AUTH-005 : Redirection vers 2FA pour compte sécurisé', () => {
    cy.get('[data-testid="input-email"]').type('marie.martin@email.com')
    cy.get('[data-testid="input-password"]').type('SecurePass456!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="btn-verify-2fa"]').should('be.visible')
  })

  it('TC-AUTH-006 : Connexion 2FA avec code valide', () => {
    cy.get('[data-testid="input-email"]').type('marie.martin@email.com')
    cy.get('[data-testid="input-password"]').type('SecurePass456!')
    cy.get('[data-testid="btn-login"]').click()
    '123456'.split('').forEach((digit, index) => {
      cy.get(`[data-testid="2fa-code-${index}"]`).type(digit)
    })
    cy.get('[data-testid="btn-verify-2fa"]').click()
    cy.get('[data-testid="tab-dashboard"]').should('be.visible')
  })

  it('TC-AUTH-007 : Erreur 2FA avec code invalide', () => {
    cy.get('[data-testid="input-email"]').type('marie.martin@email.com')
    cy.get('[data-testid="input-password"]').type('SecurePass456!')
    cy.get('[data-testid="btn-login"]').click()
    '000000'.split('').forEach((digit, index) => {
      cy.get(`[data-testid="2fa-code-${index}"]`).type(digit)
    })
    cy.get('[data-testid="btn-verify-2fa"]').click()
    cy.get('[data-testid="2fa-error"]').should('be.visible')
  })

  it('TC-AUTH-008 : Déconnexion ramène à la page login', () => {
    cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
    cy.get('[data-testid="input-password"]').type('Test1234!')
    cy.get('[data-testid="btn-login"]').click()
    cy.get('[data-testid="btn-logout"]').click()
    cy.get('[data-testid="input-email"]').should('be.visible')
  })

  it('TC-AUTH-009 : Message erreur a un rôle alert WCAG', () => {
    cy.get('[data-testid="login-error"]').should('have.attr', 'role', 'alert')
  })
})