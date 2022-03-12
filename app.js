const express = require('express');
const cors = require('cors');
const app = express();

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

module.exports = app;