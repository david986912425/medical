const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { sanitizeUserEmailInput } = require("../helpers/validaciones")
const usuariosGet = async( res , req = request) => {

    const { limite = 20, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([

        User.countDocuments(),
        User.find( )
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const createUser = async(req, res) => {
    try {
        const { email, role } = req.body

        const emailBody = sanitizeUserEmailInput(email);

        const existEmail = await User.findOne({ email: emailBody });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado ya existe'
            })
        }

        const validRoles = ['admin', 'client', 'employee'];
        if (!validRoles.includes(role) ){
            return res.status(400).json({
                msg: `El rol ${role} no es válido`
            })
        }

        const user = new User(req.body)
        
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync('123456', salt)
        await user.save()

        res.status(201).json({
            ok: true,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, hable con el administrador'
        })
    }
}

const updateUser = async(req, res) => {

    const {id} = req.params;
    const { _id, password, email, ...resto} = req.body;

    const validRoles = ['admin', 'client', 'employee'];
    if (!validRoles.includes(resto.role) ){
        return res.status(400).json({
            msg: `El rol ${resto.role} no es válido`
        })
    }

    const user = await User.findById( id )
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id,resto, {new:true});

    res.json({
        msg: 'Usuario actualizado correactamente',
        usuario
    });
}

const getUserById = async(req = request, res=response) => {
    const {id} = req.params;
    const user = await User.findById( id )
        
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }
    res.json( user );
}

const deleteUser = async(req = request, res=response) => {
    const {id} = req.params;
    const user = await User.findById( id )
        
    if (!user){
        return res.status(400).json({
            msg: `La usuario no existe`
        })
    }
    const usuario = await User.findByIdAndDelete(id);
    res.json( usuario );
}

module.exports = {
    usuariosGet,
    createUser,
    updateUser,
    getUserById,
    deleteUser,
}