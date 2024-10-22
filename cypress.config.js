const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    projectId: "zc1p9r",
    baseUrl: 'http://localhost:3000',
    supportFile: false, // Deshabilita el archivo de soporte si no es necesario
  },
});
