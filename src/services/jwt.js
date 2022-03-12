const jwt_simple = require('jwt-simple');
const moment = require('moment');
const key = "clave_segura";

exports.crearToken = function (usuario) {

    let payload = {

        sub: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,

        iat: moment().unix(),
        exp: moment().day(1, 'days').unix()
    };

    return jwt_simple.encode(payload, key);
};