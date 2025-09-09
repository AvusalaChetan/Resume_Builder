const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resume: {
      type:[  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resume'
  }], 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
