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