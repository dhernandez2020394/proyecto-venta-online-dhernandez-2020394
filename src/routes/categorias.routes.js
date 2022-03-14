// IMPORTACIONES
const express = require('express');
const categoriasController = require('../controllers/categorias.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/Authentication');

// RUTAS
const api = express.Router();

api.get('/categorias', md_autenticacion.Auth, categoriasController.ObtenerCategorias);
api.post('/agregarCategoria', md_autenticacion.Auth, categoriasController.AgregarCategoria);
api.put('/editarCategoria/:idCategoria', md_autenticacion.Auth, categoriasController.EditarCategoria);
api.delete('/eliminarCategoria/:idCategoria', md_autenticacion.Auth, categoriasController.EliminarCategoria);

module.exports = api;