const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-token');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}