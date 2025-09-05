const express = require("express");
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto,
} = require("../controller/productController");

const router = express.Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de productos en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 *       500:
 *         description: Error en el servidor.
 */ 
router.get("/", obtenerProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a buscar.
 *     responses:
 *       200:
 *         description: Producto encontrado.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/:id", obtenerProducto);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un producto
 *     description: Crea un nuevo producto en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Producto A"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción del Producto A"
 *               marca:
 *                 type: string
 *                 example: "Marca X"
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *       400:
 *         description: Solicitud inválida.
 *       500:
 *         description: Error en el servidor.
 */

router.post("/", crearProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Editar un producto
 *     description: Actualiza la información de un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Producto A"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción del Producto A"
 *               marca:
 *                 type: string
 *                 example: "Marca X"
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.put("/:id", editarProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar.
 *     responses:
 *       204:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.delete("/:id", eliminarProducto);

module.exports = router;
