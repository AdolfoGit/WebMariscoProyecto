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
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// Cachear las respuestas de la API de productos
registerRoute(
  ({ url }) => {
    if (url.origin === 'https://lacasadelmariscoweb.azurewebsites.net' && url.pathname.startsWith('/api/CasaDelMarisco/TraerProductos')) {
      console.log('Interceptada solicitud de productos:', url.href);
      return true;
    }
    return false; 
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