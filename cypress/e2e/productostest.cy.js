describe("Prueba E2E para la funcionalidad de búsqueda de productos", () => {
  beforeEach(() => {
    // Configurar el localStorage con los datos de usuario simulados antes de cada prueba
    cy.visit('/productos'); // Asegúrate de que la URL sea correcta
    cy.window().then((win) => {
      win.localStorage.setItem(
        'userData',
        JSON.stringify({
          idUsuario: 20,
          Nombre: 'Jafet Esaú',
          ApellidoPaterno: 'Guzmán',
          ApellidoMaterno: 'Martínez',
          Correo: '20211041@uthh.edu.mx',
          Telefono: '7711425326',
          Rol: 1,
          EstadoCuenta: 'Activo',
          Token: 'mockToken123',
          Icono: 'https://example.com/icon.png',
        })
      );
    });

    // Recargar la página después de configurar el localStorage
    cy.reload();
  });
  
  it("Debe buscar productos que coincidan con la palabra clave y limpiar el campo de búsqueda después", () => {
    // Navegar a la página del componente
    cy.visit("/productos"); // Cambia la ruta según corresponda
  
    // Ingresar una palabra clave en el campo de búsqueda
    const palabraClave = "Hamburguesa"; // Cambia esto según un producto existente en la lista
    cy.get("[data-testid='search-input']").type(palabraClave);
  
    // Hacer clic en el botón de "Buscar"
    cy.contains("Buscar").click();
  
    // Esperar un momento para que los productos se carguen
    cy.wait(2000); // Ajusta el tiempo según sea necesario
  
    // Verificar que los productos que se muestran coincidan con la palabra clave
    cy.get(".shadow-none") // Asegúrate de que este sea el selector correcto
      .should("have.length.greaterThan", 0) // Verifica que al menos un producto esté presente
      .each(($producto) => {
        cy.wrap($producto)
          .find(".nombre-producto") // Selector del nombre de cada producto
          .should("contain.text", palabraClave);
      });
  
    // Limpiar el campo de búsqueda y confirmar que esté vacío
    cy.get("[data-testid='search-input']").clear().should("have.value", "");

    

  });


  it('Debería cargar los productos en la página', () => {
    // Verifica que el texto 'Coctel pequeño de camarón' esté presente en la página
    cy.contains('Platillos fueres', { timeout: 10000 }).should('be.visible');
       
    console.log('Productos cargados correctamente.');
  });



});
