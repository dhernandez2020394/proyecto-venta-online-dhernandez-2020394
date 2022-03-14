// IMPORTACIONES
const express = require('express');
const productosController = require('../controllers/productos.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/Authentication');

// RUTAS
const api = express.Router();

api.get('/productos', productosController.ObtenerProductos);
api.post('/agregarProducto', md_autenticacion, productosController.AgregarProducto);
api.put('/editarProducto/:idProducto', md_autenticacion, productosController.EditarProducto);
api.delete('/eliminarProducto/:idProducto',md_autenticacion, productosController.EliminarProducto);

// FUNCIONES EXTRA
api.get('/producto/:idProducto', productosController.ObtenerProducto);
api.put('/editarStockProducto', md_autenticacion, productosController.EditarStockProducto);
api.put('/agregarCategoriaProducto/:idProducto/:idCategoria',md_autenticacion, productosController.agregarCategoriaProducto);
api.put('/editarCategoriaProducto/:idCategoria', md_autenticacion, productosController.editarCategoriaProducto);

module.exports = api;