const mongoose = require('mongoose');

const userBioSchema = mongoose.Schema({
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  
  dob:Number,
  location: String,
  about:String,
},{ timestamps: true })

module.exports = mongoose.model("bio",userBioSchema)
