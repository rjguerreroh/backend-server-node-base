const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validField } = require('../middlewares/validate-fields');
const { isRoleValid, existEmail, existUserById } = require('../helpers/db-validators');

const { 
    userPost, 
    userGet, 
    userPut, 
    userDelete, 
    usersPath
} = require('../controllers/users');

router.get('/', userGet);

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('password','El password debe de ser de mas de 6 letras').isLength({ min: 6 }),
    check('email').custom( existEmail ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( isRoleValid ),
    validField
], userPost);

router.put('/:id', [
    check('id','Not a valid ID').isMongoId(),
    check('id').custom( existUserById ),
    check('rol').custom( isRoleValid ),
    validField
],userPut);

router.delete('/:id', [
    check('id','Not a valid ID').isMongoId(),
    check('id').custom( existUserById ),
    validField
],userDelete);

router.patch('/', usersPath);

module.exports = router;