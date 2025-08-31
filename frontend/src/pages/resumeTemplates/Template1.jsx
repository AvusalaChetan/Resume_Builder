import "./template.css"
const Template1 = ({
  ref,
  name,
  personal,
  skills,
  projects,
  certificate,
  education,
}) => {
  const { skill, techstack } = skills;
  return (
    <div
      ref={ref}
      className="bg-gray-50 max-w-4xl mx-auto p-8 md:p-12 border border-gray-200 shadow-lg rounded-lg"
    >
      {/* Header Section */}
      <header className="text-center border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {name || "A. Chetan"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
          {personal.email && <span>&#9993;{personal.email}</span>}
          {personal.phone && <span>&#128222; +91 {personal.phone}</span>}
          {personal.city && <span>&#128205; {personal.city}</span>}
          {personal.portfolio && (
            <a
              href={personal.portfolio}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
             &#127760; {personal.portfolio}
            </a>
          )}
        </div>
      </header>

      {/* About Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
          Career Objective
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          {personal?.about
            ? personal.about[0].toUpperCase() + personal.about.slice(1)
            : ""}
        </p>
      </section>

      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
          Education
        </h2>
        <div className="space-y-4">
          {["School", "Intermediate", "Degree"].map((level) => {
            const items = education.filter((item) => item.level === level);
            if (!items.length) return null;
            return (
              <div key={level}>
                <h3 className="text-lg font-medium text-gray-700 mb-2 capitalize">
                  {level}
                </h3>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3"
                  >
                    <div>
                      <p className="text-gray-600 text-sm capitalize">{item.degreeName}</p>
                      <h4 className="text-gray-900 font-semibold capitalize">
                        {item.institution}
                      </h4>
                      <p>{item.course} </p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {item.startYear?.slice(0, 10)} to {item.endYear?.slice(0, 10)}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Core Skills</h4>
            <p className="text-gray-600 text-sm capitalize">
              {skill?.join(", ") || "Not provided"}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Tech Stack</h4>
            <p className="text-gray-600 text-sm capitalize">
              {techstack?.join(", ") || "Not provided"}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
          Projects
        </h2>
        <div className="space-y-4">
          {projects?.map((project, idx) => (
            <div key={idx}>
              <h4 className="text-gray-900 font-medium text-lg">
                {project.projectName}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {project.projectDescription}
              </p>
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Project
                </a>
              )}
              {project.projectTechstack?.length > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Tech Used:</span>{" "}
                  {project.projectTechstack.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
          Certifications
        </h2>
        <ul className="space-y-2 text-sm">
          {certificate?.length > 0 ? (
            certificate.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-medium text-gray-800 capitalize">
                  {item.courseName}
                  {item.certificateProvider && ` (${item.certificateProvider})`}
                </span>
                {item.certificateLink ? (
                  <a
                    href={item.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400">No Link</span>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No certifications added.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Template1;
