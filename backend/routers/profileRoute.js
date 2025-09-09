const express = require("express");
const router = express.Router();
const profile = require('../controller/profileController')

router.get('/',profile)

module.exports = router 