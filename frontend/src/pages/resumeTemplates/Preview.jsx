import React, { useState } from "react";

const Preview = ({

  formData,
}) => {
  const {
    name,
    email,
    about,
    pNumber,
    city,
    portfolio,
    institutionName,
    degreeName,
    course,
    level,
    skills,
    techstack,
    projects,
    certifications
  } = formData;

console.log("projects",projects)
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {name || "Your Name"}
        </h2>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          Preview
        </span>
      </div>

      <div>
        <h3>personal</h3>
        <div>
          email:<span>{email}</span>
        </div>
        <div>
          phonenumber:<span>{pNumber}</span>
        </div>
        <div>
          city:<span>{city}</span>
        </div>
        <div>
          portfolio:<span>{portfolio}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-1">about you/carrier </h3>
        <p className="text-gray-600">
          {about || "Add about/carrier objective"}
        </p>
      </div>

      <div className="education mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Education</h3>
        {Array.isArray(level) && level.length > 0 ? (
          level.map((edu, idx) => (
            <div key={idx} className="mb-4 p-3 border-l-4 border-blue-500 bg-gray-50">
              <div className="font-bold text-lg text-blue-700">
                {edu.level || `Education #${idx + 1}`}
              </div>
              {edu.name && (
                <div className="text-gray-700">
                  <strong>Institution:</strong> {edu.name}
                </div>
              )}
              {edu.course && (
                <div className="text-gray-700">
                  <strong>Course:</strong> {edu.course}
                </div>
              )}
              {edu.degreeName && (
                <div className="text-gray-700">
                  <strong>Degree:</strong> {edu.degreeName}
                </div>
              )}
              {edu.start && (
                <div className="text-gray-700">
                  <strong>Start Date:</strong> {edu.start}
                </div>
              )}
              {edu.end && (
                <div className="text-gray-700">
                  <strong>End Date:</strong> {edu.end}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No education details added yet</p>
        )}
      </div>

      <div className="skills mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
        {Array.isArray(skills) && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No skills added yet</p>
        )}
      </div>

      <div className="techstack mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Tech Stack</h3>
        {Array.isArray(techstack) && techstack.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {techstack.map((tech, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No tech stack added yet</p>
        )}
      </div>

      <div className="projects mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Projects</h3>
        {Array.isArray(formData.projects) && formData.projects.length > 0 ? (
          formData.projects.map((project, idx) => (
            <div key={idx} className="mb-4 p-3 border-l-4 border-purple-500 bg-purple-50">
              <div className="font-bold text-lg text-purple-700">
                {project.title || `Project #${idx + 1}`}
              </div>
              {project.description && (
                <div className="text-gray-700 mt-1">
                  <strong>Description:</strong> {project.description}
                </div>
              )}
              {project.technologies && (
                <div className="text-gray-700 mt-1">
                  <strong>Technologies:</strong> {project.technologies}
                </div>
              )}
              {project.link && (
                <div className="text-gray-700 mt-1">
                  <strong>Link:</strong> 
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {project.link}
                  </a>
                </div>
              )}
              {project.duration && (
                <div className="text-gray-700 mt-1">
                  <strong>Duration:</strong> {project.duration}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No projects added yet</p>
        )}
      </div>

      <div className="certifications mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Certifications</h3>
        {Array.isArray(formData.certifications) && formData.certifications.length > 0 ? (
          formData.certifications.map((cert, idx) => (
            <div key={idx} className="mb-4 p-3 border-l-4 border-orange-500 bg-orange-50">
              <div className="font-bold text-lg text-orange-700">
                {cert.courseName || `Certification #${idx + 1}`}
              </div>
              {cert.provider && (
                <div className="text-gray-700 mt-1">
                  <strong>Provider:</strong> {cert.provider}
                </div>
              )}
              {cert.link && (
                <div className="text-gray-700 mt-1">
                  <strong>Link:</strong> 
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {cert.link}
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No certifications added yet</p>
        )}
      </div>
    </div>
  );
};

export default Preview;
