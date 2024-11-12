/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);


const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

precacheAndRoute([
  { url: '/', revision: null },
  { url: '/login', revision: null },
  { url: '/Nosotros', revision: null },
  { url: '/ofertas', revision: null },
  { url: '/productos', revision: null },
  { url: '/registrar', revision: null },
  { url: '/reservaciones', revision: null },
  { url: '/perfil', revision: null },
  // Añade todas las rutas que deseas precachear
]);

// Función para cachear la respuesta de la API en la instalación del service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('api-precache').then((cache) => {
      return fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductos')
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');

          // Clona la respuesta y guárdala en el caché
          cache.put('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductos', response.clone());

          // Recupera la respuesta del caché para verificar si se almacenó correctamente
          return cache.match('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductos')
            .then((cachedResponse) => {
              return cachedResponse.json(); // Convierte la respuesta en JSON
            })
            .then((data) => {
              console.log('Datos guardados en el caché:', data); // Muestra los datos guardados
            });
        })
        .catch((error) => {
          console.error('Error al guardar en el caché:', error);
        });
    })
  );
});



// Estrategia para cachear todas las páginas visitadas, incluso aquellas no precargadas
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);


registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /\_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL("/index.html")
);


registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "image",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  // Ruta para cachear CSS, JS e imágenes
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);


self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nueva Notificación';
  const options = {
    body: data.body + " hasta el: "+ data.fechaFin || '¡Tienes una nueva promoción!',
    icon: data.image, 

  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/ofertas') // Cambia esta URL a la que deseas abrir al hacer clic
  );
});
