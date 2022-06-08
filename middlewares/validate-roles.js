const isAdminRole = ( req, res, next ) => {
    if ( !req.user ) {
        res.status(500).json({
            message: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, name } = req.user;
    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `The user ${name} does not adminitrator`
        });
    }
    next();
}

const hasRole = ( ...roles ) => {
    return ( req, res, next ) => {
        if ( !req.user ) {
            res.status(500).json({
                message: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        console.log(req.user.rol);

        if ( !roles.includes( req.user.rol )) {
            return res.status(401).json({
                message: `The service require this roles: ${roles}`
            });
        }
        
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}