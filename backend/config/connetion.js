const mongoose = require('mongoose');

const connetionDB = ()=>{
    mongoose.connect(`${process.env.MONGODB_URL}/resumeBuilder`)
.then(()=> console.log('connection is successfull'))
.catch((err)=> console.log(err.message))
}

module.exports = connetionDB 