const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
    usuario: String,
    carrito: [{
        nombreProducto: String,
        cantidadProducto: Number,
        precioUnitario: Number,
        subTotal: Number
    }],
    
    totalCarrito: Number
});

module.exports = mongoose.model('Carrito', carritoSchema);