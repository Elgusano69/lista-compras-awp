const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Lista local de compras (en memoria)
let items = [];

// Configuración de Body-parser para recibir datos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para obtener todos los items
app.get("/items", (req, res) => {
  res.json(items);
});

// Ruta para crear un nuevo item
app.post("/items", (req, res) => {
  const { name, quantity } = req.body;
  const newItem = { id: Date.now(), name, quantity };
  items.push(newItem); // Agregar el nuevo ítem a la lista
  res.status(201).json(newItem);
});

// Ruta para actualizar un item
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const item = items.find((item) => item.id === parseInt(id));
  if (item) {
    item.name = name;
    item.quantity = quantity;
    res.json(item);
  } else {
    res.status(404).send("Item no encontrado");
  }
});

// Ruta para eliminar un item
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    items.splice(index, 1); // Eliminar el ítem de la lista
    res.status(204).end();
  } else {
    res.status(404).send("Item no encontrado");
  }
});

// Servir el archivo manifest.json
app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "manifest.json"));
});

// Servir el archivo service-worker.js
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "service-worker.js"));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
