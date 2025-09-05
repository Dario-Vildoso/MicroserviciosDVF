const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Prestamo",
  tableName: "prestamos",
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    usuario: {
      type: String,
    },
    fecha_prestamo: {
      type: Date,
    },
    fecha_devolucion: {
      type: Date,
    },
  },
  relations: {
    libro: {
      type: "many-to-one",
      target: "Libro",
      joinColumn: true,
      eager: true
    },
  },
});