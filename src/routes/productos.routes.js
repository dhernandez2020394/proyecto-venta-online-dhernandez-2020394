// IMPORTACIONES
const express = require('express');
const productosController = require('../controllers/productos.controller');

// RUTAS
const api = express.Router();

api.get('/productos', productosController.ObtenerProductos);
api.post('/agregarProducto', productosController.AgregarProducto);
api.put('/editarProducto/:idProducto', productosController.EditarProducto);
api.delete('/eliminarProducto/:idProducto', productosController.EliminarProducto);

// FUNCIONES EXTRA
api.get('/producto/:idProducto', productosController.ObtenerProducto);
api.put('/editarStockProducto', productosController.EditarStockProducto);

module.exports = api;