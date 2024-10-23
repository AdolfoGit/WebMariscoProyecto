describe('Sample Test', () => {
    it('visits the app', () => {
      cy.visit('https://web-marisco-proyecto-2z3t.vercel.app'); // Cambia a la URL de tu aplicación
      cy.contains('Welcome'); // Asegúrate de que esto sea un texto que exista en tu página de inicio
    });
  });
  