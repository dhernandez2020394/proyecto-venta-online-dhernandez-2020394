const Categorias = require('../models/categorias.model.js');
const Productos = require('../models/productos.model.js');

//  OBTENER TODAS LAS CATEGORIAS
function ObtenerCategorias(req, res) {

    if (req.user.rol == "ADMIN") {
        Categorias.find({}, (err, todasLasCategorias) => {

            return res.send({ categorias: todasLasCategorias })
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
    
}

// AGREGAR UNA CATEGORIA
function AgregarCategoria(req, res) {
    var parametros = req.body;
    var modCategoria = new Categorias();

     if(req.user.rol == "ADMIN"){
        if (parametros.categoria) {
            modCategoria.categoria = parametros.categoria;
    
            modCategoria.save((err, categoriaGuardada) => {
    
                return res.send({ categoria: categoriaGuardada });
            });
        } else {
            return res.send({ mensaje: "Debe de que enviar un nombre de Categoria" })
        }
    }else{
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }

}

// EDITAR UNA CATEGORIA
function EditarCategoria(req, res) {
    var idCat = req.params.idCategoria;
    var parametros = req.body;

    if (req.user.rol == "ADMIN") {
        Categorias.findByIdAndUpdate(idCat, parametros, { new: true }, (err, categoriaEditada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!categoriaEditada) return res.status(404)
                .send({ mensaje: 'Error al Editar la Categoria' });
    
            return res.status(200).send({ categoria: categoriaEditada });
        })
    }else{
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
    
}

// ELIMINAR UNA CATEGORIA
function EliminarCategoria(req, res) {
    var idCat = req.params.idCategoria;


    if (req.user.rol == "ADMIN") {
        Categorias.findByIdAndDelete(idCat, (err, categoriaEliminada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!categoriaEliminada) return res.status(500)
                .send({ mensaje: 'Error al eliminar la Categoria' })
    
            return res.status(200).send({ categoria: categoriaEliminada });
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
    
}

function crearCategoriaAlIniciar(req, res) {
    var modCategorias = new Categorias();

    Categorias.find({ categoria: 'por defecto' }, (err, categoriasEncontradas) => {
        if (categoriasEncontradas.length > 0) {
            return console.log("Ya existe la Categoria por defecto");
        } else {

            modCategorias.categoria = "por defecto";

            modCategorias.save((err, categoriaGuardada) => {
                if (err) return console.log('Error en la peticion');
                if (!categoriaGuardada) return console.log('Error al guardar la categoria por defecto');

                return console.log(categoriaGuardada);
            })

        }
    })
}

function ObtenerIdPorDefecto(req, res) {
    var modCategorias = new Categorias();

    Categorias.findOne({ categoria: 'por defecto' }, (err, categoriasEncontradas) => {

        if (categoriasEncontradas) {
            modCategorias = categoriasEncontradas;
            return modCategorias._id;
        } else {
            crearCategoriaAlIniciar();
        }
    })
}

module.exports = {
    ObtenerCategorias,
    AgregarCategoria,
    EditarCategoria,
    EliminarCategoria,
    crearCategoriaAlIniciar,
    ObtenerIdPorDefecto
}