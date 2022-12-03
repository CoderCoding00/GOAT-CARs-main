const { check } = require('express-validator');
const { User } = require('../models');

module.exports = {
    validateEmail: check('email')
        .trim()
        .normalizeEmail ()
        .isEmail()
        .withMessage('Invalid Email')
        .custom(async (email) => {
            const existingUser = await User.findOne({
                where: { email: existingUser },
            });
            if (existingUser) {
                throw new Error('Email already in use')
            }
        })
}
