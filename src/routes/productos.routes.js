// IMPORTACIONES
const express = require('express');
const productosController = require('../controllers/productos.controller');

// RUTAS
const api = express.Router();

api.get('/productos', productosController.ObtenerProductos);
api.post('/agregarProducto', productosController.AgregarProducto);
api.put('/editarProducto/:idProducto', productosController.EditarProducto);
api.delete('/eliminarProducto/:idProducto', productosController.EliminarProducto);

module.exports = api;