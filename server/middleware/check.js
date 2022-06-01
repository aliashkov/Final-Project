const { body , validationResult } = require('express-validator')

const loginValidator = () => {
    return [
        body('email' , "Incorrect email").isEmail(),
        body('password', "Password length less than 6 symbols").isLength({ min: 6 }),
    ]
}

const registerValidator = () => {
    return [
        body('username' , "Username cannot be null").notEmpty(),
        body('email' , "Incorrect email").isEmail(),
        body('password', "Password length less than 6 symbols").isLength({ min: 6 }),
    ]
}

module.exports = loginValidator , registerValidator;