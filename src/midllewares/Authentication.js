const jwt_simple = require('jwt-simple');
const moment = require('moment');
const key = "clave_segura";

exports.Auth = function (req, res, next) {
    if( !req.headers.authorization ){
        return res.status(500).send({ mensaje: "No se encontro Authorization en la cabecera de peticion" });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try { 
        var payload = jwt_simple.decode(token, key);
        if(payload.exp <= moment().unix()){
            return res.status(500).send({ mensaje: "El token ha expirado."});
        }
    } catch (error) {
        return res.status(500).send({ mensaje: "El token no es valido."})
    }

    req.user = payload;
    next();
}