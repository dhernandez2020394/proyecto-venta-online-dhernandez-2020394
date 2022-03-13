const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturasSchema = new Schema({
    usuario: [{
        idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
    }],
    compraFinal: [{
        nombreProducto: String,
        cantidadProducto: Number,
        precioUnitario: Number,
        subTotal: Number
    }],
    
    totalCarrito: Number
});

module.exports = mongoose.model('Facturas', facturasSchema);