describe("Prueba E2E para el flujo de login", () => {
  // Ignora los errores no controlados específicos
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Cannot read properties of null")) {
      return false;
    }
    return true;
  });

  it("Debe permitir que un usuario inicie sesión con credenciales válidas", () => {
    // 1. Visitar la página de login
    cy.visit("/login");

    // 2. Ingresar el correo electrónico y la contraseña válidos
    cy.get('input[name="email"]').type("20210671@uthh.edu.mx");
    cy.get('input[name="password"]').type("@D0lf0_2021");

    // 3. Hacer clic en el botón de iniciar sesión
    cy.get('button[type="submit"]').click({ force: true });

    // 4. Verificar que el usuario sea redirigido a la página multifactor
    cy.url({ timeout: 10000 }).should("include", "/multifactor");

  });

  it("Debe mostrar un mensaje de error con credenciales inválidas", () => {
    // 1. Visitar la página de login
    cy.visit("/login");

    // 2. Ingresar un correo electrónico y contraseña inválidos
    cy.get('input[name="email"]').type("20210671@uthh.edu.mx");
    cy.get('input[name="password"]').type("dfevtrert");

    // 3. Hacer clic en el botón de iniciar sesión
    cy.get('button[type="submit"]').click({ force: true });


    // 4. Verificar que se muestre un mensaje de error
    cy.contains("Contraseña incorrecta", { timeout: 10000 }).should("be.visible");
  });
});

