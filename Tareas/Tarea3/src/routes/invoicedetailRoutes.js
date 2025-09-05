const express = require("express");
const {
  crearDetalle,
  obtenerDetallesPorFactura,
  editarDetalle,
  eliminarDetalle,
} = require("../controller/invoicedetailController");

const router = express.Router();

/**
 * @swagger
 * /facturas/{factura_id}/detalles:
 *   get:
 *     summary: Obtener detalles de una factura
 *     description: Retorna todos los detalles asociados a una factura específica.
 *     parameters:
 *       - in: path
 *         name: factura_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a consultar.
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida correctamente.
 *       404:
 *         description: Factura no encontrada o sin detalles.
 */
router.get("/facturas/:factura_id/detalles", obtenerDetallesPorFactura);

/**
 * @swagger
 * /facturas/{factura_id}/detalles:
 *   post:
 *     summary: Crear un detalle para una factura
 *     description: Crea un nuevo detalle asociado a una factura existente.
 *     parameters:
 *       - in: path
 *         name: factura_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a la que se le agrega el detalle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto_id:
 *                 type: integer
 *                 example: 1
 *               cantidad:
 *                 type: integer
 *                 example: 3
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 59.99
 *     responses:
 *       201:
 *         description: Detalle creado correctamente.
 *       400:
 *         description: Error en los datos enviados.
 */
router.post("/facturas/:factura_id/detalles", crearDetalle);

/**
 * @swagger
 * /detalles/{id}:
 *   put:
 *     summary: Editar un detalle de factura
 *     description: Actualiza la información de un detalle de factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 example: 5
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 75.50
 *     responses:
 *       200:
 *         description: Detalle actualizado correctamente.
 *       404:
 *         description: Detalle no encontrado.
 */
router.put("/detalles/:id", editarDetalle);

/**
 * @swagger
 * /detalles/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     description: Elimina un detalle específico de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a eliminar.
 *     responses:
 *       204:
 *         description: Detalle eliminado correctamente.
 *       404:
 *         description: Detalle no encontrado.
 */
router.delete("/detalles/:id", eliminarDetalle);

module.exports = router;
