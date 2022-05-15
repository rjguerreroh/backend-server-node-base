const userGet = (req,res) => {
    const {name='Not defined', age, address} = req.query;
    res.json({
        message: 'Request get',
        name,
        age,
        address
    });
};
const userPost = (req,res) => {
    const { name, edad } = req.body;
    res.json({
        message: 'Request post',
        name,
        edad
    });
};
const userPut = (req,res) => {
    const id = req.params.id;
    res.json({
        id,
        message: 'Request put',
    });
};
const userDelete = (req,res) => {
    res.json({
        message: 'Request delete',
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