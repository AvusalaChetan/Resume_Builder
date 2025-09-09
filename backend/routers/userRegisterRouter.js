const express = require("express");
const router = express.Router();
const {userCreating, verifyOtp} = require('../controller/userControler')
// mw importing
const { checkingRegisterFeilds } = require("../middlewares/checkingFeilds");

router.post("/",checkingRegisterFeilds, userCreating);
router.post('/verify-otp',verifyOtp)

module.exports = router;
