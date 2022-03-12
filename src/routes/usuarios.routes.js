// IMPORTACIONES
const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');

// RUTAS
const api = express.Router();

api.get('/usuarios', usuariosController.ObtenerUsuarios);
api.post('/agregarUsuario', usuariosController.AgregarUsuario);
api.put('/editarUsuario/:idUsuario', usuariosController.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario', usuariosController.EliminarUsuario);

module.exports = api;