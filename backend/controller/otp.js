const nodemailer = require("nodemailer");

const sendOTP = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const generateOTP = () => { 
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const otp = generateOTP();

  try {
    const info = await transporter.sendMail({
      from: '"Resume_builder" <chetanavusala@gmail.com>',
      to: email,
      subject: "Email Verification - Resume Builder",
      text: `Your OTP is: ${otp}`,
      html: `<h2>Email Verification</h2><p>Your OTP is: <b>${otp}</b></p><p>This OTP expires in 10 minutes.</p>`,
    });
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendOTP;
