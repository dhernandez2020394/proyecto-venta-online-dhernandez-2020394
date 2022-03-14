const Carrito = require('../models/carrito.model');
const Producto = require('../models/productos.model');

//
function iniciarCarrito(req, res) {
    var modCarrito = new Carrito();
    var parametros = req;
    console.log(req)
    
    modCarrito.usuario = parametros._id;
    modCarrito.totalCarrito = 0;
    
    console.log('En el Carrito')
    console.log(modCarrito.usuario)

    modCarrito.save((err, carritoGuardado) => {
        console.log(err);
        console.log(!carritoGuardado);
        console.log({carrito: carritoGuardado})
    });

}
// AGREGAR PRODUCTOS AL CARRITO
function agregarProductoCarrito(req, res) {

    const parametros = req.body;
    if (req.user.rol == "Cliente") {
        Producto.findOne({ nombre: parametros.nombreProducto }, (err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion producto' });
            if (!productoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar el producto' });
            console.log(req.user.sub)
            Carrito.findByIdAndUpdate({usuario: req.user.sub} , {
                $push: {
                    carrito: {
                        nombreProducto: parametros.nombreProducto,
                        cantidadProducto: parametros.cantidad, precioUnitario: productoEncontrado.precio
                    }
                }
            },
                { new: true },
                (err, productoAgregadoCarrito) => {
                    console.log(productoAgregadoCarrito)
                    if (err) return res.status(500).send({ mensaje: 'Error en  la peticion del carrito' })
                    if (!productoAgregadoCarrito) return res.status(500).send({ mensaje: 'Error al agregar el producto al carrito' });

                    let totalCarritoLocal = 0;
                    for (let i = 0; i < productoAgregadoCarrito.carrito.length; i++) {
                        totalCarritoLocal += productoAgregadoCarrito.carrito[i].precioUnitario;
                    }

                    Usuario.findByIdAndUpdate(req.user.sub, { totalCarrito: totalCarritoLocal }, { new: true },
                        (err, totalActualizado) => {
                            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion total Carrito' });
                            if (!totalActualizado) return res.status(500).send({ mensaje: 'Error al actualizar el total del carrito' });

                            return res.status(200).send({ usuario: totalActualizado })
                        })
                })
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}




module.exports = {
    iniciarCarrito,
    agregarProductoCarrito
}