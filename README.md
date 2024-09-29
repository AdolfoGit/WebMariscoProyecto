# Proyecto PWA
#### Objetivos
- Sistema de Feedback: Implementar un sistema de retroalimentación (Feedback) en la página web para evaluar la satisfacción del usuario con respecto a la experiencia en la página y los productos ofrecidos. El sistema incluirá un modal de calificación que aparecerá después de la compra de un platillo.
- Conversión a PWA: Convertir la página web en una Progressive Web App (PWA) para mejorar la accesibilidad, experiencia del usuario, y rendimiento, permitiendo que los usuarios instalen la página en sus dispositivos móviles y accedan a ella offline.

Para la realizacion de este trabajo se hara con la metodología scrumm, fue seleccionada para el desarrollo de la PWA y del sistema de feedback debido a varias ventajas que se alinean con las necesidades y características del proyecto. Scrum se centra en la flexibilidad, la colaboración y la entrega incremental, factores que son esenciales en un entorno donde los requisitos pueden cambiar rápidamente y donde se necesita retroalimentación constante para ajustar la experiencia del usuario.
 
## Selección de herramienta de control de versiones
La herramienta será **GitHub** para trabajar las versiones de la aplicación.

## Estrategia de versionamiento
En este proyecto se ha seleccionado GitHub Flow como la estrategia de versionamiento. GitHub Flow es una metodología simple y efectiva que facilita la colaboración y la entrega continua de código en proyectos con ramas ligeras y fáciles de gestionar.
**Rama principal main**
   - La rama principal o main contiene el código que está siempre listo para ser desplegado en producción o al menos en un entorno estable
**Ramas de características feature branches**
   - Para desarrollar nuevas funcionalidades, se crearán ramas de características a partir de la rama main. Cada rama estará dedicada a una nueva funcionalidad, corrección de bugs, o mejoras en el código.
   - Las ramas de características deben tener nombres descriptivos para indicar claramente qué tarea se está trabajando, por ejemplo: feature/nueva-funcionalidad o bugfix/corrección-bug-login.

### Flujo de trabajo
Creación de una nueva rama
-	Se comenzará una nueva tarea creando una rama desde la rama main para cada uno de los integrantes.
-	Esta nueva rama permitirá trabajar de manera aislada sin afectar el código en main hasta que su trabajo esté listo para revisión.
Realización de cambios
Se harán los cambios en su rama local y realizará commits para guardar el progreso
Cada commit debe ser claro y conciso, describiendo qué se hizo en ese paso.
Sincronización con el repositorio remoto
-	Una vez que los integrantes estén listos para compartir su trabajo, enviará los cambios a GitHub.
-	Creación de un Pull Request (PR)
-	Cuando un integrante haya completado su tarea, se abrirá un pull request desde la interfaz de GitHub. 
-	El pull request debe incluir una descripción detallada de los cambios, qué se ha hecho y, si es necesario, mencionar si se requieren pruebas o revisiones específicas.
-	Responsable de hacer los PR: Esaú.
Revisión del código
-	Esaú, como responsable de las merges, revisará el pull request. Esto incluye revisar el código, probar los cambios localmente si es necesario, y asegurarse de que no haya conflictos con la rama main.
-	Si encuentra problemas, dejará comentarios en el pull request para que Adolfo los revise y realice las correcciones necesarias. Adolfo puede hacer los cambios y volver a hacer push a la misma rama, actualizando el pull request.
Aprobación y merge
-	Una vez que se hayan revisado y esté satisfecho con los cambios y el código esté limpio, aprobará el pull request y hará el merge en la rama main. Esaú es el único responsable de este paso para asegurarse de que el código en main esté siempre estable.
-	Después de la fusión, la rama de características de Adolfo sera eliminada ya que los cambios ya están integrados en main.
-	Responsable de hacer merge: Esaú.
Despliegue o pruebas adicionales
-	Una vez que los cambios han sido fusionados en main, la aplicación puede ser desplegada o probada en un entorno más amplio. Esto depende del flujo de trabajo específico del proyecto.

## Estrategia de despliegue
En el caso de este proyecto de PWA, la estrategia de despliegue seleccionada es la de Rolling Deployment. Esta estrategia permite actualizar gradualmente las instancias de la aplicación sin interrumpir el servicio para los usuarios y asegurando que el proceso de despliegue sea estable y controlado.

**Entorno de Desarrollo (ramas features):**
Es el entorno en el que los desarrolladores trabajan directamente. Aquí se implementan y prueban las nuevas funcionalidades, mejoras o correcciones de errores. El entorno de desarrollo es el primero en recibir actualizaciones.
-	Propósito: Probar nuevas características a nivel técnico antes de pasar a una fase de validación más formal.
-	Característica: No es accesible para usuarios finales, y el código puede estar en constante cambio.
**Entorno de Staging (Preproducción / main):**
El entorno de staging es una copia lo más cercana posible del entorno de producción, donde se realizan pruebas más exhaustivas. En este entorno, se validan las nuevas versiones de la PWA antes de ser desplegadas a producción.
-	Propósito: Realizar pruebas finales de integración y validación, asegurando que todos los componentes funcionen como se espera antes de la liberación pública.
-	Característica: En staging se prueban funcionalidades críticas como el Service Worker, el modo offline y la integración con el sistema de feedback.
**Entorno de Producción:**
Es el entorno público donde los usuarios acceden a la PWA. Solo las versiones completamente validadas se despliegan en producción.
-	Propósito: Asegurar que los usuarios finales puedan utilizar la aplicación sin problemas de rendimiento ni funcionalidad.
-	Característica: Este entorno debe estar optimizado para la alta disponibilidad, escalabilidad y estabilidad. Aquí, se monitorea de cerca el rendimiento de la PWA, y se garantiza la correcta entrega de actualizaciones mediante la estrategia de Rolling Deployment.


## Instalación
Para instalar las dependencias necesarias y configurar el proyecto, sigue estos pasos:

1. **Instala Node.js**:
   - Asegúrate de tener Node.js instalado. Puedes descargarlo desde [Node.js](https://nodejs.org/).

2. **Clona el Repositorio**:
   - Clona el repositorio en tu máquina local:
     ```bash
     git clone https://github.com/JafetEsauWerlybi/aplicacionmovilcdm.git
     ```

4. **Navega al Directorio del Proyecto**:
   - Cambia al directorio del proyecto:
     ```bash
     cd WebMariscoProyecto
     ```

5. **Instala las Dependencias del Proyecto**:
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install
     ```

6. **Ejecuta la Aplicación**:
   - Finalmente, puedes iniciar la aplicación en un entorno de desarrollo ejecutando:
     ```bash
     npm start
     ```
