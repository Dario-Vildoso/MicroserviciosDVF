const { getRepository } = require("typeorm");
const { Product } = require("../entity/Product");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  const productos = await getRepository(Product).find();
  res.json(productos);
};

// Obtener un producto por ID
const obtenerProducto = async (req, res) => {
  const producto = await getRepository(Product).findOne(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  res.json(producto);
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const nuevoProducto = getRepository(Product).create(req.body);
  await getRepository(Product).save(nuevoProducto);
  res.status(201).json(nuevoProducto);
};

// Actualizar un producto
const editarProducto = async (req, res) => {
  const producto = await getRepository(Product).findOne(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  getRepository(Product).merge(producto, req.body);
  await getRepository(Product).save(producto);
  res.json(producto);
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const producto = await getRepository(Product).findOne(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
  await getRepository(Product).remove(producto);
  res.status(204).send();
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto,
};