const { getRepository } = require("typeorm");
const { InvoiceDetail } = require("../entity/Invoicedetail");
const { Invoice } = require("../entity/Invoice");
const { Product } = require("../entity/Product");

// Añadir detalle a una factura existente
const crearDetalle = async (req, res) => {
  const { factura_id, producto_id, cantidad, precio } = req.body;
  const factura = await getRepository(Invoice).findOne(factura_id);
  const producto = await getRepository(Product).findOne(producto_id);

  if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

  const nuevoDetalle = getRepository(InvoiceDetail).create({
    factura,
    producto,
    cantidad,
    precio,
  });
  await getRepository(InvoiceDetail).save(nuevoDetalle);
  res.status(201).json(nuevoDetalle);
};

// Obtener los detalles de una factura específica
const obtenerDetallesPorFactura = async (req, res) => {
  const factura_id = req.params.factura_id;
  const detalles = await getRepository(InvoiceDetail).find({
    where: { factura: factura_id },
    relations: ["producto", "factura"],
  });
  res.json(detalles);
};

// Actualizar detalles de una factura
const editarDetalle = async (req, res) => {
  const detalle = await getRepository(InvoiceDetail).findOne(req.params.id);
  if (!detalle) return res.status(404).json({ mensaje: "Detalle no encontrado" });
  getRepository(InvoiceDetail).merge(detalle, req.body);
  await getRepository(InvoiceDetail).save(detalle);
  res.json(detalle);
};

// Eliminar detalle de una factura
const eliminarDetalle = async (req, res) => {
  const detalle = await getRepository(InvoiceDetail).findOne(req.params.id);
  if (!detalle) return res.status(404).json({ mensaje: "Detalle no encontrado" });
  await getRepository(InvoiceDetail).remove(detalle);
  res.status(204).send();
};

module.exports = {
  crearDetalle,
  obtenerDetallesPorFactura,
  editarDetalle,
  eliminarDetalle,
};