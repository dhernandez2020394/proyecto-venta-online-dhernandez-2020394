const Categorias = require('../models/categorias.model.js');

//  OBTENER TODAS LAS CATEGORIAS
function ObtenerCategorias (req, res) {
    Categorias.find({}, (err, todasLasCategorias) => {

        return res.send({ categorias: todasLasCategorias })
    })
}

// AGREGAR UNA CATEGORIA
function AgregarCategoria (req, res) {
    var parametros = req.body;
    var modCategoria = new Categorias();
    
    if(parametros.categoria){
        modCategoria.categoria = parametros.categoria;

        modCategoria.save((err, categoriaGuardada)=>{

            return res.send({ categoria: categoriaGuardada});
        });
    } else {
        return res.send({ mensaje: "Debe de que enviar un nombre de Categoria"})
    }
}

// EDITAR UNA CATEGORIA
function EditarCategoria(req, res) {
    var idCat = req.params.idCategoria;
    var parametros = req.body;

    Categorias.findByIdAndUpdate(idCat, parametros, { new : true } ,(err, categoriaEditada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!categoriaEditada) return res.status(404)
            .send({ mensaje: 'Error al Editar la Categoria' });

        return res.status(200).send({ categoria: categoriaEditada});
    })
}

// ELIMINAR UNA CATEGORIA
function EliminarCategoria(req, res) {
    var idCat = req.params.idCategoria;

    Categorias.findByIdAndDelete(idCat, (err, categoriaEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!categoriaEliminada) return res.status(500)
            .send({ mensaje: 'Error al eliminar la Categoria' })

        return res.status(200).send({ categoria: categoriaEliminada });
    })
}

module.exports = {
    ObtenerCategorias,
    AgregarCategoria,
    EditarCategoria,
    EliminarCategoria
}