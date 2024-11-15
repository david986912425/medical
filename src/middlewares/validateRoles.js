const user = require("../models/user");
const {response} = require("express");

const validateUserRol = ( ...roles) => {
    return async(req, next ,res=response ) => {
        if (!req.uid) {
            return res.status(401).json({msg: 'Token no validado'});
        }

        const currentUser = await user.findById(req.uid)

        if (!roles.includes(currentUser.role)) {
            return res.status(401).json({
                msg: `No tiene privilegios para usar este servicio, roles validos: ${roles}`
            });
        }
        
        next();
    }
}

module.exports = {
    validateUserRol
}