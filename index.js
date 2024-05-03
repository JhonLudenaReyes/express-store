// Importar las dependencias necesarias
const express = require("express");
const bodyParser = require("body-parser");

// Crear una instancia de Express
const app = express();
const PORT = 3000;

// Middleware para parsear el body de las peticiones
app.use(bodyParser.json());

// Datos de ejemplo para simular una base de datos
let productos = [
  { id: 1, nombre: "TELEVISOR", precio: 10 },
  { id: 2, nombre: "AIRE ACONDICIONADO", precio: 20 },
  { id: 3, nombre: "REFRIGERADOR", precio: 30 },
];

// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

// Ruta para obtener un producto por su ID
app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((producto) => producto.id === id);
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Ruta para crear un nuevo producto
app.post("/productos", (req, res) => {
  const producto = req.body;
  productos.push(producto);
  res.status(201).json(producto);
});

// Ruta para actualizar un producto por su ID
app.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productoIndex = productos.findIndex((producto) => producto.id === id);
  if (productoIndex !== -1) {
    productos[productoIndex] = req.body;
    res.json(productos[productoIndex]);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Ruta para eliminar un producto por su ID
app.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter((producto) => producto.id !== id);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
