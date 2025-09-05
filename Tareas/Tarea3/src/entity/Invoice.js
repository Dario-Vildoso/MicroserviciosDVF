const { EntitySchema } = require("typeorm");

module.exports.Invoice = new EntitySchema({
  name: "Invoice",
  tableName: "invoice",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    fecha: {
      type: "date",
    },
  },
  relations: {
    cliente: {
      type: "many-to-one",
      target: "Client",
      inverseSide: "facturas",
      onDelete: "CASCADE",
    },
    detalles: {
      type: "one-to-many",
      target: "InvoiceDetail",
      inverseSide: "factura",
    },
  },
});