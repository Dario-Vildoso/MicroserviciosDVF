const { EntitySchema } = require("typeorm");

module.exports.Medico = new EntitySchema({
  name: "Medico",
  tableName: "medicos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
    },
    apellido: {
      type: "varchar",
    },
    cedula_profesional: {
      type: "varchar",
      unique: true,
    },
    especialidad: {
      type: "varchar",
    },
    anios_experiencia: {
      type: "int",
    },
    correo: {
      type: "varchar",
      unique: true,
    },
  },
});
