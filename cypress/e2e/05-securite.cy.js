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
/**
   * TEST DE RÉGRESSION — Issue #1
   * Anomalie détectée Sprint 1 :
   * Les utilisateurs ne pouvaient pas se reconnecter après avoir
   * modifié leur mot de passe (désynchronisation base de données)
   * 
   * Ce test valide que la correction est effective et permanente.
   * Exécuté à chaque sprint pour éviter toute régression future.
   */

 // ── Étape 1 : Changer le mot de passe ─────────────────────────────
  cy.log('🔑 Étape 1 : Modification du mot de passe')
  cy.get('[data-testid="btn-change-password"]').click()
  cy.get('[data-testid="input-current-password"]').type('Test1234!')
  cy.get('[data-testid="input-new-password"]').type('NewPass@2025!')
  cy.get('[data-testid="input-confirm-password"]').type('NewPass@2025!')
  cy.get('[data-testid="btn-save-password"]').click()
  cy.get('[data-testid="security-success"]')
    .should('be.visible')
    .and('contain.text', 'modifié avec succès')

  // ── Étape 2 : Déconnexion ─────────────────────────────────────────
  cy.log('🚪 Étape 2 : Déconnexion')
  cy.get('[data-testid="btn-logout"]').click()
  cy.get('[data-testid="btn-login"]').should('be.visible')

  // ── Étape 3 : Reconnexion avec le NOUVEAU mot de passe ────────────
  cy.log('✅ Étape 3 : Reconnexion avec le nouveau mot de passe')
  cy.get('[data-testid="input-email"]').type('test@digitalbank.fr')
  cy.get('[data-testid="input-password"]').type('NewPass@2025!')
  cy.get('[data-testid="btn-login"]').click()

  // ── Étape 4 : Vérification ────────────────────────────────────────
  cy.log('🎉 Étape 4 : Vérification de la connexion réussie')
  cy.get('[data-testid="tab-dashboard"]')
    .should('be.visible')
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