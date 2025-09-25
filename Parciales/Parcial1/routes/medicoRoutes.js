const express = require("express");
const { getRepository } = require("typeorm");
const { Medico } = require("../entity/Medico");
const { obtenerMedicos, crearMedico, editarMedico, eliminarMedico } = require("../controller/medicoController");

const router = express.Router();

/**
 * @swagger
 * /medico:
 *   get:
 *     summary: Obtener todos los medicos
 *     description: Retorna una lista de medicos en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de medicos obtenida correctamente.
 */
router.get("/", obtenerMedicos);

/**
 * @swagger
 * /medico:
 *   post:
 *     summary: Crear un medico
 *     description: Crea un nuevo medico en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: "medico@example.com"
 *               contraseña:
 *                 type: string
 *                 example: "password123"
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               rol:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: medico creado correctamente.
 */
router.post("/", crearMedico);

/**
 * @swagger
 * /medico/{id}:
 *   put:
 *     summary: Editar un medico
 *     description: Actualiza los datos de un medico existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medico a editar.
 *     responses:
 *       200:
 *         description: medico actualizado correctamente.
 *       404:
 *         description: medico no encontrado.
 */
router.put("/:id", editarMedico);

/**
 * @swagger
 * /medico/{id}:
 *   delete:
 *     summary: Eliminar un medico
 *     description: Elimina un medico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del medico a eliminar.
 *     responses:
 *       200:
 *         description: medico eliminado correctamente.
 *       404:
 *         description: medico no encontrado.
 */
router.delete("/:id", eliminarMedico);

module.exports = router;
