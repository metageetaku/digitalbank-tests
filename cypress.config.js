// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL de base (surchargée par Docker via variable d'environnement)
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',

    // Mobile par défaut
    viewportWidth: 390,
    viewportHeight: 844,

    // Dossier des tests
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    // Rapports
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml',
      toConsole: true,
    },

    // Screenshots & vidéos
    screenshotOnRunFailure: true,
    video: true,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});