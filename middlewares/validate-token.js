const jwt = require('jsonwebtoken');
const User = require('../models/usuario'); 
const validateJWT = async( req, res, next) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            message: 'There is not token in the request'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if ( !user ){
            return res.state(401).json({
                message: 'User does not exist in Database'
            });
        }
        if( !user.state ){
            return res.status(401).json({
                message: 'User with state false'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        })
    }
    console.log(token);
}

module.exports = {
    validateJWT
};