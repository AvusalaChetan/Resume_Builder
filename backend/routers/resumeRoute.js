const express = require("express");
const router = express.Router();
const resumeModel = require("../models/resumeModel");
const userModel = require("../models/userModel");

const {
  updateResume,
  sendDatatoFrontend,
} = require("../controller/resumeController");
const userId = require("../middlewares/userId");

router.post("/", userId, async (req, res) => {
  const { title, name } = req.body;
  const userId = req.userId;
  console.log("userId", userId);

  if (!title || !name) {
    return res
      .status(400)
      .json({ message: "Title is required", success: false });
  }

  try {
    const resumeIsExist = await resumeModel.findOne({ title, name });
       if (resumeIsExist)
      return res.status(400).json({
        message: "resume already exist with that title",
        success: false,
      });

    const newResume = await resumeModel.create({
      userId,
      title,
      name,
    });

    const user = await userModel.findOneAndUpdate(
      { _id: newResume.userId },
      {
        $push:{
          resume: newResume._id,
        }
      }
    );

console.log(user)
    res.status(201).json({
      message: "successfully created resume",
      newResume: newResume,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message, success: false });
  }
});

router.put("/:id", updateResume);

router.get("/", sendDatatoFrontend);

module.exports = router;
