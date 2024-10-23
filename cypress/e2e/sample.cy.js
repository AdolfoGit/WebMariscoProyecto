describe('Sample Test', () => {
    it('visits the app', () => {
      cy.visit('http://localhost:3000'); // Cambia a la URL de tu aplicación
      cy.contains('Welcome'); // Asegúrate de que esto sea un texto que exista en tu página de inicio
    });
  });
  