const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validField } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'The email is require').isEmail(),
    check('password', 'The password is require').not().isEmpty(),
    validField
], login);



module.exports = router;