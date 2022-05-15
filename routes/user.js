const { Router } = require('express');
const router = Router();

const { 
    userPost, 
    userGet, 
    userPut, 
    userDelete, 
    usersPath
} = require('../controllers/users');

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.post('/', userDelete);

router.patch('/', usersPath);

module.exports = router;