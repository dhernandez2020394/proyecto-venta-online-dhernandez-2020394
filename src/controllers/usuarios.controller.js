const Usuarios = require('../models/usuarios.model.js');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

//  OBTENER TODAS LOS USUARIOS
function ObtenerUsuarios(req, res) {
    Usuarios.find({}, (err, todosLosUsuarios) => {

        return res.status(200).send({ usuario: todosLosUsuarios })
    })
}

// AGREGAR UN USUARIO
function AgregarUsuario(req, res) {
    var parametros = req.body;
    var modUsuarios = new Usuarios();

    if (parametros.nombre && parametros.apellido && parametros.email && parametros.password) {

        Usuarios.find({ email: parametros.email }, (err, usuarioEncontrados) => {
            if (usuarioEncontrados.length > 0) {
                return res.status(500)
                    .send({ mensaje: "Este correo ya se encuentra utilizado" })
            } else {
                modUsuarios.nombre = parametros.nombre;
                modUsuarios.apellido = parametros.apellido;
                modUsuarios.email = parametros.email;

                modUsuarios.totalCarrito = 0;
                modUsuarios.rol = 'Cliente'

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    modUsuarios.password = passwordEncriptada;

                    modUsuarios.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' })
                        if (!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al guardar el Usuario' })

                        return res.status(200).send({ usuario: usuarioGuardado })
                    })
                })
            }
        })
    } else {
        return res.status(500).send({ mensaje: "Debe ingresar todos los datos obligatorios" })
    }
}

// EDITAR UN USUARIO
function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    delete parametros.password

    Usuarios.findByIdAndUpdate(idUser, parametros, { new: true }, (err, usuarioEditado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEditado) return res.status(404).send({ mensaje: 'Error al Editar el Usuario' });

        return res.status(200).send({ usuario: usuarioEditado });
    })
}

// ELIMINAR UN USUARIO
function EliminarUsuario(req, res) {
    var idUser = req.params.idUsuario;

    Usuarios.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(500)
            .send({ mensaje: 'Error al Eliminar el Usuario' })

        return res.status(200).send({ usuario: usuarioEliminado });
    })
}

module.exports = {
    ObtenerUsuarios,
    AgregarUsuario,
    EditarUsuario,
    EliminarUsuario
}