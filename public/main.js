async function requestNotificationPermission() {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } else {
    alert("Las notificaciones no están soportadas en este navegador.");
    return false;
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) =>
      console.log("Service Worker registrado:", registration.scope)
    )
    .catch((error) =>
      console.error("Error al registrar el Service Worker:", error)
    );
}

async function addToCart(productName) {
  console.log(`${productName} se ha unido al equipo!!🐕.`);
  const permissionGranted = await requestNotificationPermission();

  if (permissionGranted && "serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification("Gracias por tu Amabilidad", {
      body: `${productName} te lo agradecería toda su vida 🐾`,
      icon: "perro.png",
      badge: "https://img.icons8.com/ios/452/dog.png",
    });
  }
}

document
  .getElementById("sendNotification")
  ?.addEventListener("click", async () => {
    const permissionGranted = await requestNotificationPermission();

    if (permissionGranted && "serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Lista de compras", {
        body: "Hola esto es una notificacion de pruebas!",
        icon: "./icons/icon192x192.png",
        badge: "./icons/icon192x192.png",
      });
    }
  });
