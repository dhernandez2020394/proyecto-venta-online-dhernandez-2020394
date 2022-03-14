const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturasSchema = new Schema({
    carrito: [{
        idcarrito: { type: Schema.Types.ObjectId, ref: 'Carritos' }
    }],

    nombreProducto: String,
    cantidadProducto: Number,
    precioUnitario: Number,
    subTotal: Number,
    totalCarrito: Number
});

module.exports = mongoose.model('Facturas', facturasSchema);