const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
    Carrito: [{
        nombreProducto: String,
        cantidadProducto: Number,
        precioUnitario: Number,
        subTotal: Number
    }],
    totalCarrito: Number,
    facturas: [{
        idFacturas: { type: Schema.Types.ObjectId, ref: 'Facturas' }
    }]
});

module.exports = mongoose.model('Usuarios', usuarioSchema);