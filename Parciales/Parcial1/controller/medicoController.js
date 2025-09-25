const { getRepository } = require("typeorm");
const bcrypt = require("bcrypt");
const { Medico } = require("../entity/Medico");

// Obtener todos los usuarios
const obtenerMedicos = async (req, res) => {
   const medicos = await getRepository(Medico).find();
  res.json(medicos);
    // const usuarios = await getRepository(Usuario).find();
    // res.render("usuarios/index", { usuarios });
};

// Crear un nuevo medico
const crearMedico = async (req, res) => {
  const { nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo } = req.body;
  const nuevoMedico = getRepository(Medico).create({
    nombre,
    apellido,
    cedula_profesional,
    especialidad,
    anios_experiencia,
    correo,
  });
  const resultado = await getRepository(Medico).save(nuevoMedico);
  res.json(resultado);
};

// Actualizar un medico
const editarMedico = async (req, res) => {
  const { nombre, apellido, cedula_profesional, especialidad, anios_experiencia, correo } = req.body;
  const medico = await getRepository(Medico).findOne(req.params.id);
  if (medico) {
    medico.nombre = nombre;
    medico.apellido = apellido;
    medico.cedula_profesional = cedula_profesional;
    medico.especialidad = especialidad;
    medico.anios_experiencia = anios_experiencia;
    medico.correo = correo;
    const resultado = await getRepository(Medico).save(medico);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Medico no encontrado" });
  }
};

// Eliminar un usuario
const eliminarMedico = async (req, res) => {
  const resultado = await getRepository(Medico).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  editarMedico,
  eliminarMedico,
};
