const { EntitySchema } = require("typeorm");

module.exports.Product = new EntitySchema({
  name: "Product",
  tableName: "product",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
    },
    descripcion: {
      type: "varchar",
      nullable: true,
    },
    marca: {
      type: "varchar",
      nullable: true,
    },
    stock: {
      type: "int",
      default: 0,
    },
  },
  relations: {
    detalles: {
      type: "one-to-many",
      target: "InvoiceDetail",
      inverseSide: "producto",
    },
  },
});