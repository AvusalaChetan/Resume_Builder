const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const profile = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) return res.status(401).json({ message: "cookies are expried, go login first" });
  const { email } = jwt.verify(token, process.env.JWT_SECURE_KEY);
  const user = await userModel.findOne({ email }).select('-password')
  // console.log(user)
  res.json({ user, message: "data for profile page" });
  } catch (error) {
    console.log(error)
  } 
};

module.exports = profile;
