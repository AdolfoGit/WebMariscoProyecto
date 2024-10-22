const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implementar eventos del nodo
    },
    baseUrl: 'http://localhost:3000'
  },
});
