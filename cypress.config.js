const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    projectId: "zc1p9r",
    baseUrl: 'https://web-marisco-proyecto-2z3t.vercel.app',
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
});

//hola esau xd