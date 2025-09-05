const { getRepository } = require("typeorm");
const { Client } = require("../entity/Client");

// Crear nuevo cliente
const crearCliente = async (req, res) => {
  const nuevoCliente = getRepository(Client).create(req.body);
  await getRepository(Client).save(nuevoCliente);
  res.status(201).json(nuevoCliente);
};

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  const clientes = await getRepository(Client).find();
  res.json(clientes);
};

// Obtener cliente por ID
const obtenerCliente = async (req, res) => {
  const cliente = await getRepository(Client).findOne(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
  res.json(cliente);
};

// Actualizar cliente
const editarCliente = async (req, res) => {
  const cliente = await getRepository(Client).findOne(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
  getRepository(Client).merge(cliente, req.body);
  await getRepository(Client).save(cliente);
  res.json(cliente);
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  const cliente = await getRepository(Client).findOne(req.params.id);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
  await getRepository(Client).remove(cliente);
  res.status(204).send();
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerCliente,
  editarCliente,
  eliminarCliente,
};