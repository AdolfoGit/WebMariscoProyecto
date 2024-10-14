/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { NetworkFirst } from 'workbox-strategies';


clientsClaim();

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);
// por esta otra:
// const desactivarPrecache = self.__WB_MANIFEST;
// para más info: https://cra.link/PWA

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalación completada y archivos cacheados.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado y listo para servir desde la caché.');
});


const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

registerRoute(
  ({ request, url }) => {
    // Si no es una solicitud de navegación, omitir.
    if (request.mode !== 'navigate') {
      return false;
    }
    
    // Si la solicitud es un archivo (por ejemplo, una imagen), omitir.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Devolver true para manejar la navegación con index.html
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Cachear las respuestas de la API de productos
registerRoute(
  ({ url }) => {
    if (url.origin === 'https://lacasadelmariscoweb.azurewebsites.net' && url.pathname.startsWith('/api/CasaDelMarisco/TraerProductos')) {
      console.log('Interceptada solicitud de productos:', url.href);
      return true; // Esto indica que la ruta es válida y debe ser manejada.
    }
    return false; // Esto indica que la solicitud no es de la API de productos.
  },
  new NetworkFirst({
    cacheName: 'productos',
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          if (response && response.status === 200) {
            console.log('Respuesta exitosa cacheada:', response);
            return response;
          }
          console.log('Respuesta no cacheada (no exitosa):', response);
          return null;
        },
      },
    ],
  })
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
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});