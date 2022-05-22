const Role = require('../models/role');
const User = require('../models/usuario');
const mongoose = require('mongoose');

const isRoleValid = async( rol ) => {
    const existRol = await Role.findOne({rol});
    if ( !existRol ) {
        throw new Error(`The role ${ rol } is not register in the database`)
    }
};

const existEmail = async( email ) => {
    const res = await User.findOne({ email });
    if(res) {
        throw new Error(`The email: ${email}, already is register`);
    }
};

const existUserById = async( id ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    const existUser = await User.findById(id);

    if(!existUser) {
        throw new Error(`The id doesn't exist`);
    }
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserById
}