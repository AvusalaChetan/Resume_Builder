const resumeModel = require("../models/resumeModel");

const updateResume = async (req, res) => {
  const resumeId = req.params.id;
  if(!resumeId) return res.status(404).json({message:'resume is not exist '})
  const update = {};
  update.$push = {};

if (req.body.education) {
update.$push.education = { $each: req.body.education };
}
  if (req.body.projectName) {
    update.$push.projects = {
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      projectLink: req.body.projectLink,
      projectTechstack: req.body.techstackUsed,
    };
  }

  if (req.body.course_name) {
    update.$push.certifications = {
      courseName: req.body.course_name,
      certificateProvider: req.body.certificate_provider,
      certificateLink: req.body.certificate_Link,
    };
  }

  try {
    const resume = await resumeModel.findOneAndUpdate(
      { _id: resumeId },
      {
        $set: {
          "personal.email": req.body.email,
          "personal.phone": req.body.mobileNumber,
          "personal.city": req.body.city,
          "personal.about": req.body.about,
          "personal.portfolio": req.body.portfolio,
          "skills.skill": req.body.skill,
          "skills.techstack": req.body.techstack,
        },
        ...update, 
      },
      { new: true }
    );

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found", success: false });
    }
    res.status(201).json({
      message: "Successfully added this section in resume",
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};




const sendDatatoFrontend = async (req, res) => {  
  try {
    console.log(req.query)
    const url = new URL(req.headers.referer)
    const step = url.searchParams.get("step");
    const resumeId = url.searchParams.get("resumeId");
    const resume = await resumeModel.findOne({ _id: resumeId }).populate("userId");
    res.status(200).json(resume);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: error.message });
  }
};
module.exports = { updateResume, sendDatatoFrontend };
