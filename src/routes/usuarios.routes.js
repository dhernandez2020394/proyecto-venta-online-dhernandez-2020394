// IMPORTACIONES
const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');

// MIDDLEWARES
const md_autenticacion = require('../middlewares/Authentication');

// RUTAS
const api = express.Router();

api.post('/Login', usuariosController.Login);
api.get('/usuarios', usuariosController.ObtenerUsuarios);
api.post('/agregarUsuario', usuariosController.AgregarUsuario);
api.put('/editarUsuario/:idUsuario', usuariosController.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario', usuariosController.EliminarUsuario);


module.exports = api;