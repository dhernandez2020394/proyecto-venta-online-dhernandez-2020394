const Productos = require('../models/productos.model.js');
const Categoria = require('./categorias.controller')

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

    if (req.user.rol == "ADMIN") {
        Productos.find({ nombre: parametros.nombre }, (err, usuarioEncontrados) => {

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
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

// AGREGAR CATEGORIA A UN PRODUCTO
function agregarCategoriaProducto(req, res) {
    var productoId = req.params.idProducto;
    var categoriaId = req.params.idCategoria;

    if (req.user.rol == "ADMIN") {
        Productos.findByIdAndUpdate(productoId, { $push: { categoria: { idCategoria: categoriaId } } }, { new: true },
            (err, proveedorAgregado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
                if (!proveedorAgregado) return res.status(500).send({ mensaje: 'Error al agregar el proveedor al producto' });

                return res.status(200).send({ product: proveedorAgregado });
            })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

// EDITAR UN PRODUCTO
function EditarProducto(req, res) {
    var idProd = req.params.idProducto;
    var parametros = req.body

    if (req.user.rol == "ADMIN") {
        Productos.findByIdAndUpdate(idProd, parametros, { new: true }, (err, productoEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!productoEditado) return res.status(404)
                .send({ mensaje: 'Error al Editar el Producto' });

            return res.status(200).send({ producto: productoEditado });
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

// EDITAR CATEGORIA DEL PRODUCTO
function editarCategoriaProducto(req, res) {
    const categoriaId = req.params.idCategoria;
    const parametros = req.body;

    if (req.user.rol == "ADMIN") {
        Productos.findOneAndUpdate({ categoria: { $elemMatch: { idCategoria: categoriaId } } },
            { "categoria.$.idCategoria": parametros.categoria }, { new: true }, (err, categoriaAcualizada) => {
                console.log(err)
                if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
                if (!categoriaAcualizada) return res.status(500).send({ mensaje: 'Error al editar el producto' });

                return res.status(200).send({ producto: categoriaAcualizada });
            })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

function EditarStockProducto(req, res) {
    var parametros = req.body;

    if (req.user.rol == "ADMIN") {

        Productos.findOneAndUpdate({ nombre: parametros.nombre }, parametros, { new: true }, (err, productoEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!productoEditado) return res.status(404)
                .send({ mensaje: 'Error al Editar el Stock del  Producto' });

            return res.status(200).send({ producto: productoEditado });
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

// ELIMINAR UN PRODUCTO
function EliminarProducto(req, res) {
    var idProd = req.params.idProducto;

    if (req.user.rol == "ADMIN") {
        Productos.findByIdAndDelete(idProd, (err, productoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!productoEliminado) return res.status(500)
                .send({ mensaje: 'Error al Eliminar el Producto' })

            return res.status(200).send({ producto: productoEliminado });
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}


module.exports = {
    ObtenerProductos,
    AgregarProducto,
    EditarProducto,
    EliminarProducto,
    ObtenerProducto,
    EditarStockProducto,
    agregarCategoriaProducto,
    editarCategoriaProducto
}