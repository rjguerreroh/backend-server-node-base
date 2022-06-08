const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const Usuario = require('../models/usuario');

const login = async( req, res ) => {
    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'User and password does not correct'
            });
        }
        
        // Si el usuario esta activo
        if ( !usuario.state ) {
            return res.status(400).json({
                msg: 'User is remove'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                message: 'User and password does not correct'
            });
        }

        // Generar jwt
        const token = await generateJWT( usuario.id );
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log('[Error][login controller]', error );
        return res.status(500).json({
            msg: 'Algo salio mal ...'
        });
    }
};

module.exports = {
    login
}