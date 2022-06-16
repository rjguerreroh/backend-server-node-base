const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validField } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'The email is require').isEmail(),
    check('password', 'The password is require').not().isEmpty(),
    validField
], login);

router.post('/google', [
    check('id_token', 'Google token requiredk').not().isEmpty(),
    validField
], googleSignIn);

module.exports = router;