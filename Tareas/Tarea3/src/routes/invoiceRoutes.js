const express = require("express");

const {
    crearFactura,
    obtenerFacturas,
    obtenerFactura,
    obtenerFacturasPorCliente,
    editarFactura,
    eliminarFactura,
} = require("../controller/invoiceController");

const router = express.Router();

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     description: Retorna una lista de todas las facturas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida correctamente.
 */
router.get("/", obtenerFacturas);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     description: Retorna una factura específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a buscar. 
 *     responses:
 *       200:
 *         description: Factura encontrada.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/:id", obtenerFactura);

/**
 * @swagger
 * /facturas/cliente/{cliente_id}:
 *   get:
 *     summary: Obtener facturas por ID de cliente
 *     description: Retorna una lista de facturas para un cliente específico.
 *     parameters:
 *       - in: path
 *         name: cliente_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente para buscar facturas.
 *     responses:
 *       200:
 *         description: Facturas del cliente obtenidas correctamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/cliente/:cliente_id", obtenerFacturasPorCliente);

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una factura
 *     description: Crea una nueva factura asociada a un cliente existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 example: "2023-09-01"
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Factura creada correctamente.
 *       400:
 *         description: Solicitud inválida.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el servidor.
 * */
router.post("/", crearFactura);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura
 *     description: Actualiza la información de una factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 example: "2023-09-02"
 *               cliente_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Factura actualizada correctamente.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error en el servidor.
 * */
router.put("/:id", editarFactura);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura
 *     description: Elimina una factura existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a eliminar.
 *     responses:
 *       204:
 *         description: Factura eliminada correctamente.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *          description: Error en el servidor.
 * */
router.delete("/:id", eliminarFactura);
module.exports = router;
