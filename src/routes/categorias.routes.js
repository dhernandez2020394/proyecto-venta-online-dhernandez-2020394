// IMPORTACIONES
const express = require('express');
const categoriasController = require('../controllers/categorias.controller');

// RUTAS
const api = express.Router();

api.get('/categorias', categoriasController.ObtenerCategorias);
api.post('/agregarCategoria', categoriasController.AgregarCategoria);
api.put('/editarCategoria/:idCategoria', categoriasController.EditarCategoria);
api.delete('/eliminarCategoria/:idCategoria/', categoriasController.EliminarCategoria);

module.exports = api;