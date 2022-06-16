const bcryptjs = require('bcryptjs');
const { response, json } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async( req, res ) => {
    const { id_token } = req.body;
    try {
        const { email, name, img } = await googleVerify( id_token );
        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            const data = {
                name,
                email,
                password: '123456',
                img,
                rol: 'USER_ROLE',
                google: true
            };
            
            usuario = new Usuario( data );
            await usuario.save();
        }
        
        // if user is DB
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generateJWT( usuario.id );

        res.json({
            msg: 'All right',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);  
        res.status(500).json({
            msg: 'El token no es valido'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}