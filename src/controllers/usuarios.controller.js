const Usuarios = require('../models/usuarios.model.js');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

// LOGIN
function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuarios.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.' })
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar' })
        }
    })
}

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

    if (req.user.rol == "ADMIN") {
        delete parametros.nombre;
        delete parametros.apellido;
        delete parametros.email;
        delete parametros.Carrito;
        delete parametros.totalCarrito;

        Usuarios.findByIdAndUpdate(idUser, parametros, { new: true }, (err, usuarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!usuarioEditado) return res.status(404).send({ mensaje: 'Error al Editar el Usuario' });
            return res.status(200).send({ usuario: usuarioEditado });
        })
    } if (req.user.rol == "Cliente") {
        delete parametros.rol;
        Usuarios.findByIdAndUpdate(idUser, parametros, { new: true }, (err, usuarioEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!usuarioEditado) return res.status(404).send({ mensaje: 'Error al Editar el Usuario' });

            return res.status(200).send({ usuario: usuarioEditado });
        })
    }


}

// ELIMINAR UN USUARIO
function EliminarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    if (req.user.rol == "Cliente") {
        Usuarios.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!usuarioEliminado) return res.status(500)
                .send({ mensaje: 'Error al Eliminar el Usuario' })

            return res.status(200).send({ usuario: usuarioEliminado });
        })
    } else {
        return res.send({ mensaje: "No está autorizado para realizar está accion" })
    }
}

// METODO PARA CREAR EL ADMIN POR DEFECTO
function crearAdminAlIniciar(req, res) {
    var modUsuarios = new Usuarios();

    Usuarios.find({ email: 'ADMIN' }, (err, usuarioEncontrados) => {
        if (usuarioEncontrados.length > 0) {
            return console.log("Ya existe el ADMIN por defecto");
        } else {

            modUsuarios.nombre = "ADMIN";
            modUsuarios.apellido = null;
            modUsuarios.email = "ADMIN";

            modUsuarios.totalCarrito = 0;
            modUsuarios.rol = 'ADMIN'

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                modUsuarios.password = passwordEncriptada;

                modUsuarios.save((err, usuarioGuardado) => {
                    if (err) return console.log('Error en la peticion');
                    if (!usuarioGuardado) return console.log('Error al guardar el ADMIN');

                    return console.log(usuarioGuardado);
                })
            })
        }
    })
}

module.exports = {
    Login,
    ObtenerUsuarios,
    AgregarUsuario,
    EditarUsuario,
    EliminarUsuario,
    crearAdminAlIniciar
}