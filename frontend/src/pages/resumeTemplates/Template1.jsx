const Template1 = ({ name, personal, skills, projects,certificate}) => {
  const { skill, techstack } = skills;
  return (
    <div className="resume-template bg-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header Section */}
      <div className="text-center border-b-2 border-gray-300 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-5xl md:text-4xl font-bold text-gray-800 mb-2">
          {name}
        </h1>
        <div className="text-xs sm:text-sm text-gray-500 flex flex-nowrap justify-center space-x-2">
          <span className=" border-r-2 px-1 flex items-center justify-center">
            {" "}
            {personal.email}
          </span>
          <span className="border-r-2 px-1 flex items-center justify-center">
            +91 {personal.phone}
          </span>
          <span className=" border-r-2 px-1 flex items-center justify-center">
            {personal.city}{" "}
          </span>
          <span className="px-1 flex items-center justify-center">
            {personal.portfolio}
          </span>
        </div>
      </div>

      {/* About / Career Objective Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Career Objective Section / About Me
        </h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {personal?.about
            ? personal.about[0].toUpperCase() + personal.about.slice(1)
            : ""}
        </p>
      </div>

      {/* Education Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Education
        </h2>

        {/* Loop through education array */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Bachelor of Computer Science
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              University of Technology
            </p>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">2016 - 2020</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              Intermediate (Science)
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              City Junior College
            </p>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">2014 - 2016</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              High School
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Central High School
            </p>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">2012 - 2014</span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
              Core Skills
            </h4>
            <div className="flex gap-3 capitalize  text-gray-600">
              {skill?.map((skill, idx) => {
                return (
                  <div key={idx}>
                    <p>{skill},</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
              Tech Stack
            </h4>
            <div className="text-xs sm:text-sm text-gray-600">
              {techstack?.map((skill, idx) => {
                return (
                  <div key={idx}>
                    <p>{skill},</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Projects
        </h2>
        <div>
          {projects?.map((project, idx) => {
            return (
              <div key={idx} className="space-y-2 sm:space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700 text-sm sm:text-base">
                    {project.projectName}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {project.projectDescription}{" "}
                  </p>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    className="text-blue-500 text-xs sm:text-sm"
                  >
                    View Project
                  </a>
                </div>
                <div>
                  <p className="text-md">Techstack used in this project </p>
                  <div className="flex items-center justify-start space-x-0.5">
                    {project.projectTechstack.map((item, idx) => {
                      return (
                        <div key={idx} className=" max-w-fit p-1">
                          <p>{item},</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Certifications
        </h2>
        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
         {certificate && certificate.length > 0 ? (
    certificate.map((item, idx) => (
      <li key={idx} className="flex items-center gap-2">
        <span className="font-medium text-gray-800 capitalize">
          {item.courseName || "Certification"}{item.certificateProvider ? ` (${item.certificateProvider})` : ""} 
        </span>
        {" - "}
        {item.certificateLink ? (
          <a
            href={item.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            View
          </a>
        ) : (
          <span className="text-gray-400">No Link</span>
        )}
      </li>
    ))
  ) : (
    <li className="text-gray-400">No certifications added yet.</li>
  )}
      
        </ul>
      </div>
    </div>
  );
};

export default Template1;
