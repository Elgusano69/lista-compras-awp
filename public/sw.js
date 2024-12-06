// Nombre del caché
const CACHE_NAME = "shopping-list-cache-v1";

// Recursos a precargar en el caché
const RESOURCES_TO_CACHE = [
  "/",
  "/index.html",
  "./style.css", // Archivo CSS, si lo tienes
  "/app.js", // Archivo JS principal, si lo tienes
  "./icons/icon32x32.png",
  "./icons/icon192x192.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(RESOURCES_TO_CACHE); // Aquí se usa RESOURCES_TO_CACHE
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Manejar notificaciones push
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "¡Nueva notificación desde tu lista de compras!",
    icon: "./icons/icon192x192.png",
    badge: "./icons/icon192x192.png",
  };

  event.waitUntil(
    self.registration.showNotification("Lista de Compras TavoCorp", options)
  );
});
