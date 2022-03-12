const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    categoria: String
});

module.exports = mongoose.model('Categorias', categoriaSchema);