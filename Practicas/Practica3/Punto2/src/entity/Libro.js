const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Libro",
  tableName: "libros",
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    titulo: {
      type: String,
    },
    autor: {
      type: String,
    },
    isbn: {
      type: String,
      unique: true,
    },
    anio_publicacion: {
      type: "int",
    },
  },
  relations: {
    prestamos: {
      type: "one-to-many",
      target: "Prestamo",
      inverseSide: "libro",
    },
  },
});