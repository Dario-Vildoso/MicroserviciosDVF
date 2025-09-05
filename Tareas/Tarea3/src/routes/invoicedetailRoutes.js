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
 * /detalles/factura/{factura_id}:
 *   get:
 *     summary: Obtener detalles por ID de factura
 *     description: Retorna una lista de detalles para una factura específica.
 *     parameters:
 *       - in: path
 *         name: factura_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura para buscar detalles.
 *     responses:
 *       200:
 *         description: Detalles de la factura obtenidos correctamente.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/factura/:factura_id", obtenerDetallesPorFactura);

/**
 * @swagger
 * /detalles:
 *   post: 
 *     summary: Crear un detalle de factura
 *     description: Añade un nuevo detalle a una factura existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               factura_id:
 *                 type: integer
 *                 description: ID de la factura a la que se añade el detalle.
 *               producto_id:
 *                 type: integer
 *                 description: ID del producto que se añade al detalle.
 *               cantidad:
 *                 type: integer
 *                 example: 3
 *               precio:
 *                 type: number
 *                 example: 29.99
 *     responses:
 *       201:
 *         description: Detalle de factura creado correctamente.
 *       400:
 *         description: Solicitud inválida.
 *       404:
 *         description: Factura o producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.post("/", crearDetalle);
/**
 * @swagger
 * /detalles/{id}:
 *   put:
 *     summary: Actualizar un detalle de factura
 *     description: Actualiza la información de un detalle de factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a actualizar.
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
 *                 example: 19.99
 *     responses:
 *       200:
 *         description: Detalle de factura actualizado correctamente.
 *       404:
 *         description: Detalle no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put("/:id", editarDetalle);
/**
 * @swagger
 * /detalles/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     description: Elimina un detalle de factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a eliminar.
 *     responses:
 *       204:
 *         description: Detalle de factura eliminado correctamente.
 *       404:
 *         description: Detalle no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete("/:id", eliminarDetalle);

module.exports = router;
