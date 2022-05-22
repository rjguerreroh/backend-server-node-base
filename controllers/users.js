const User = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const userGet = async(req,res) => {
    const { limit = 5, since = 0} = req.params;
    const query = { state: true }
    const [total,users] = await Promise.all([
        await User.countDocuments( query ),
        await User.find( query ).skip(Number(since)).limit(Number(limit))
    ]);

    res.json({
        users,
        total
    });

    /*
    TODO:
     - Make validator for params
     - Mongoose impletation for pagination

    EXAMPLE INPLEMENTATION
        const userGet = async (req = request, res = response) => {
            const { page = 1 } = req.query;
        
            if (Number(page) < 1) {
                return res.status(400).json({
                    message: 'El numero de paginas debe ser 1 minimo'
                })
            }
        
            const users = await User.find()
                .skip((Number(page) - 1) * 10)
                .limit(Number(page) * 10);
        
            const total_users = await User.countDocuments();
        
            res.json({
                page,
                total_users,
                users
            });
        }
    */
};

const userPost = async(req,res) => {
    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol});
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    // Save in DB
    await user.save();
    res.json({
        message: 'Request post',
        user,
    });
};

const userPut = async(req,res) => {
    const id = req.params.id;
    const { _id, password, google, email, ...rest } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        message: 'Request put',
        user
    });
};

const userDelete = async(req,res) => {
    const { id } = req.params;
    // Fisacamen lo barramos
    // const user  = await User.findByIdAndDelete( id )
    console.log(id);
    const user = await User.findByIdAndUpdate( id, { state: false })
    res.json({
        user
    });
};
const usersPath = (req,res) => {
    res.json({
        message: 'Request path',
    });
};

module.exports = {
    userPost,
    userGet,
    userPut,
    userDelete,
    usersPath
}