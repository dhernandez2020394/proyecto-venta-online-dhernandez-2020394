const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturasSchema = new Schema({

    compraFinal: [{
        nombreProducto: String,
        cantidadProducto: Number,
        precioUnitario: Number,
        subTotal: Number
    }],
    
    totalCarrito: Number
});

module.esports = mongoose.model('Facturas', facturasSchema);