const { EntitySchema } = require("typeorm");

module.exports.InvoiceDetail = new EntitySchema({
  name: "InvoiceDetail",
  tableName: "invoice_detail",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    cantidad: {
      type: "int",
    },
    precio: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
  },
  relations: {
    factura: {
      type: "many-to-one",
      target: "Invoice",    
      inverseSide: "detalles",
      onDelete: "CASCADE",
    },
    producto: {
      type: "many-to-one",
      target: "Product",
      inverseSide: "detalles",
      onDelete: "CASCADE",
    },
  },
});