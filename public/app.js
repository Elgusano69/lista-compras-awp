const apiUrl = "http://localhost:3000/compras"; // Cambia por la URL de tu servidor en producción

// Obtener la lista de compras
async function obtenerCompras() {
  const res = await fetch(apiUrl);
  const compras = await res.json();
  const lista = document.getElementById("lista-compras");
  lista.innerHTML = "";

  compras.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.cantidad}
      <button class="edit" onclick="editarCompra(${item.id})">Editar</button>
      <button onclick="eliminarCompra(${item.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Agregar un nuevo item
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, cantidad }),
  });

  await obtenerCompras();
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
});

// Eliminar un item
async function eliminarCompra(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  await obtenerCompras();
}

// Editar un item
function editarCompra(id) {
  const item = listaCompras.find((item) => item.id === id);
  document.getElementById("nombre").value = item.nombre;
  document.getElementById("cantidad").value = item.cantidad;
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const cantidad = document.getElementById("cantidad").value;

    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, cantidad }),
    });

    await obtenerCompras();
  });
}

obtenerCompras();
