const { getRepository } = require("typeorm");
const { Invoice } = require("../entity/Invoice");
const { Client } = require("../entity/Client");

// Crear nueva factura asociada a un cliente
const crearFactura = async (req, res) => {
  const { fecha, cliente_id } = req.body;
  const cliente = await getRepository(Client).findOne(cliente_id);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });

  const nuevaFactura = getRepository(Invoice).create({ fecha, cliente });
  await getRepository(Invoice).save(nuevaFactura);
  res.status(201).json(nuevaFactura);
};

// Obtener todas las facturas
const obtenerFacturas = async (req, res) => {
  const facturas = await getRepository(Invoice).find({ relations: ["cliente", "detalles"] });
  res.json(facturas);
};

// Obtener factura por ID
const obtenerFactura = async (req, res) => {
  const factura = await getRepository(Invoice).findOne(req.params.id, { relations: ["cliente", "detalles"] });
  if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
  res.json(factura);
};

// Obtener todas las facturas de un cliente específico
const obtenerFacturasPorCliente = async (req, res) => {
  const cliente_id = req.params.cliente_id;
  const facturas = await getRepository(Invoice).find({
    where: { cliente: cliente_id },
    relations: ["cliente", "detalles"],
  });
  res.json(facturas);
};

// Actualizar información de factura
const editarFactura = async (req, res) => {
  const factura = await getRepository(Invoice).findOne(req.params.id);
  if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
  getRepository(Invoice).merge(factura, req.body);
  await getRepository(Invoice).save(factura);
  res.json(factura);
};

// Eliminar factura
const eliminarFactura = async (req, res) => {
  const factura = await getRepository(Invoice).findOne(req.params.id);
  if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
  await getRepository(Invoice).remove(factura);
  res.status(204).send();
};

module.exports = {
  crearFactura,
  obtenerFacturas,
  obtenerFactura,
  obtenerFacturasPorCliente,
  editarFactura,
  eliminarFactura,
};