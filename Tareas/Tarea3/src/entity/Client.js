const { EntitySchema } = require("typeorm");

module.exports.Client = new EntitySchema({
  name: "Client",
  tableName: "client",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    ci: {
      type: "varchar",
      unique: true,
    },
    nombres: {
      type: "varchar",
    },
    apellidos: {
      type: "varchar",
    },
    sexo: {
      type: "varchar",
    },
  },
  relations: {
    facturas: {
      type: "one-to-many",
      target: "Invoice",
      inverseSide: "cliente",
    },
  },
});