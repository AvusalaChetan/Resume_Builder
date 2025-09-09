const {check } = require('express-validator')
const checkingRegisterFeilds = [
    check('email').isEmail()
    .custom((value)=>{
        const validomain = 'gmail.com';
        const domain = value.split('@')[1];
        if(!validomain.includes(domain)){
            throw new Error('not a valid email')
        }
        return true;
        
    }).withMessage('email is not correct')
]

module.exports = {checkingRegisterFeilds}