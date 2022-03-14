// IMPORTACIONES
const express = require('express');
const carritoController = require('../controllers/carritos.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/Authentication');

// RUTAS
const api = express.Router();

api.put('/agregarCarrito', md_autenticacion.Auth, carritoController.agregarProductoCarrito);


module.exports = api;