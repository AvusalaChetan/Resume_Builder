const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel");
const { checkingRegisterFeilds } = require("../middlewares/checkingFeilds");
const profile = require('../controller/profileController')

router.post("/login", checkingRegisterFeilds, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ message: "all feilds are require" });

  try {
    const user = await userModel.findOne({ email });
  
  if (!user)
    return res
.status(500)
.json({ message: "email or password are  not correct " });

const result = await bcrypt.compare(password, user.password);

  if (!result) {
  return res.status(401).json({ message: "email or password are  not correct " });
  }

   const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECURE_KEY,
        {
          expiresIn: "2h",
        }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, 
      });

  res.status(200).json({ message: "user login successfully" });
} catch (error) {
      res.status(500).json({ message: "somthing went worng from sever",error: error.message });
  }
});


router.get('/logout', async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  
  res.status(200).json({ message: 'Logged out successfully', });
});

module.exports = router;
