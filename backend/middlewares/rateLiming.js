const rateLimite = require('express-rate-limit');

const limiter = rateLimite({
    max:100,
    windowMs: 60 * 60 * 1000, 
    message:'too many request,try some time like ater 1hr'
})

module.exports = limiter