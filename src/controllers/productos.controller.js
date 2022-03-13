const Productos = require('../models/productos.model.js');

//  OBTENER TODAS LOS PRODUCTOS
function ObtenerProductos(req, res) {
    Productos.find({}, (err, todosLosProductos) => {

        return res.status(200).send({ productos: todosLosProductos })
    })
}

function ObtenerProducto(req, res) {
    var idProd = req.params.idProducto;

    Productos.findById(idProd, (err, productoEcontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!productoEcontrado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });

        return res.status(200).send({ producto: productoEcontrado });
    })
}

// AGREGAR UN PRODUCTO
function AgregarProducto(req, res) {
    var parametros = req.body;
    var modProductos = new Productos();

    Productos.find({ nombre: parametros.nombre}, (err, usuarioEncontrados) => {

        if (usuarioEncontrados.length > 0) {
            return res.status(500)
            .send({ mensaje: "Ya existe un producto con el nombre " + parametros.nombre })
        } else {

            if (parametros.nombre && parametros.cantidad && parametros.precio) {
                modProductos.nombre = parametros.nombre;
                modProductos.cantidad = parametros.cantidad;
                modProductos.precio = parametros.precio;

                modProductos.save((err, productoGuardado) => {

                    return res.status(200).send({ producto: productoGuardado });
                });
            } else {
                return res.status(500).send({ mensaje: "Debe ingresar todos los datos obligatorios" })
            }
        }
    })
}

// EDITAR UN PRODUCTO
function EditarProducto(req, res) {
    var idProd = req.params.idProducto;
    var parametros = req.body
    
    Productos.findByIdAndUpdate(idProd, parametros, { new: true }, (err, productoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!productoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Producto' });

        return res.status(200).send({ producto: productoEditado });
    })
}

function EditarStockProducto(req, res) {
    var parametros = req.body;

    Productos.findOneAndUpdate({nombre: parametros.nombre}, parametros, { new: true }, (err, productoEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!productoEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Stock del  Producto' });

        return res.status(200).send({producto: productoEditado});
    })
}

// ELIMINAR UN PRODUCTO
function EliminarProducto(req, res) {
    var idProd = req.params.idProducto;

    Productos.findByIdAndDelete(idProd, (err, productoEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!productoEliminado) return res.status(500)
            .send({ mensaje: 'Error al Eliminar el Producto' })

        return res.status(200).send({ producto: productoEliminado });
    })
}

module.exports = {
    ObtenerProductos,
    AgregarProducto,
    EditarProducto,
    EliminarProducto,
    ObtenerProducto,
    EditarStockProducto
}