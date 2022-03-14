const express = require('express');
const cors = require('cors');
const app = express();

//IMPORTAR EL MODELO USUARIOS
const Usuarios = require('./src/controllers/usuarios.controller');
const Categorias = require('./src/controllers/categorias.controller');

// IMPORTACION RUTAS
const categoriasRoutes = require('./src/routes/categorias.routes');
const productosRoutes = require('./src/routes/productos.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes')

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/
app.use('/api', categoriasRoutes, productosRoutes, usuariosRoutes);

//CREAR VALORES POR DEFECTO AL INICIAR LA APLICACION
Usuarios.crearAdminAlIniciar();
Categorias.crearCategoriaAlIniciar();

module.exports = app;