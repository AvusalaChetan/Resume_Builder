const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../controller/otp");

let tempUsers = {};

const userCreating = async (req, res) => {
   try {
  const { name, email, password } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "account already exist on that email go to login" });
  }

  const saltRounds = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, saltRounds);

    const otp = await sendOTP(email);
    tempUsers = {
      name,
      email,
      password: hash,
      otp,
      otpExpires: Date.now() + 3 * 60 * 1000,
    };

    console.log(tempUsers)
    res.status(201).json({ message: "enter otp", otp });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

//====================================///
const verifyOtp = async (req, res) => {
  const { inputOtp } = req.body;

  if (inputOtp !== tempUsers.otp) {
    return res.status(400).json({ message: "invalid OTP" }) 
  }
  if (tempUsers.otpExpires < Date.now()) {
   return res.status(400).json({ message: "OTP expired" })
    }

  try {
    const newUser = await userModel.create({
      name: tempUsers.name,
      email: tempUsers.email,
      password: tempUsers.password,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: tempUsers.email },
      process.env.JWT_SECURE_KEY,
      {
        expiresIn: "3h",
      }
    );
 
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).send("account created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { userCreating, verifyOtp };
