const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    categoria: [{
        idCategoria: { type: Schema.Types.ObjectId, ref: 'Categoria'}
    }],
    cantidad: Number,
    precio: Number,
});

module.esports = mongoose.model('Productos', productoSchema);