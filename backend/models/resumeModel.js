const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  personal: {
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    about: { type: String, default: "" },
    portfolio: { type: String, default: "" },
  },

  education: [   
    {
      level: String,
      degreeName:String,
      institution: String,
      course: String,
      startYear: Date,
      endYear: Date,
    },
  ],

  skills: {
    skill: {
      type: [String],
    },
    techstack: {
      type: [String],
    },
  },

  projects: [
    {
      projectName: String,
      projectDescription: String,
      projectLink: String,
      projectTechstack: [String],
    },
  ],

  certifications: [
    {
      courseName: String,
      certificateProvider: String,
      certificateLink: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("resume", resumeSchema);
