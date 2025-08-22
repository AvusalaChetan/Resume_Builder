import React, { useRef } from 'react'


const Template1 = ({ reference }) => {
  return (
    <div
      ref={reference}
      className="resume-template bg-white p-4 sm:p-6 md:p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header Section */}
      <div className="text-center border-b-2 border-gray-300 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-5xl md:text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
        <div className="text-xs sm:text-sm text-gray-500 flex flex-nowrap justify-center space-x-2">
          <span className="inline">📧 john.doe@email.com</span>
          <span className="inline">📱 (555) 123-4567</span>
          <span className="inline">📍 New York, NY</span>
        </div>

      </div>

      {/* Summary Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Professional Summary
        </h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications.
          Proficient in React, Node.js, and modern web technologies. Passionate about clean code and user experience.
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Work Experience
        </h2>

        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Senior Developer</h3>
            <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">2022 - Present</span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-1">Tech Company Inc.</p>
          <ul className="text-xs sm:text-sm text-gray-700 list-disc list-inside ml-2 sm:ml-4 space-y-1">
            <li>Led development of 3 major web applications</li>
            <li>Mentored junior developers and conducted code reviews</li>
            <li>Improved application performance by 40%</li>
          </ul>
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Web Developer</h3>
            <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">2020 - 2022</span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-1">Startup Solutions</p>
          <ul className="text-xs sm:text-sm text-gray-700 list-disc list-inside ml-2 sm:ml-4 space-y-1">
            <li>Built responsive websites using React and Node.js</li>
            <li>Collaborated with design team on UI/UX improvements</li>
            <li>Implemented RESTful APIs and database solutions</li>
          </ul>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Frontend</h4>
            <p className="text-xs sm:text-sm text-gray-600">React, JavaScript, HTML5, CSS3, Tailwind CSS</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Backend</h4>
            <p className="text-xs sm:text-sm text-gray-600">Node.js, Express, MongoDB, SQL</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Tools</h4>
            <p className="text-xs sm:text-sm text-gray-600">Git, Docker, AWS, VS Code</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Other</h4>
            <p className="text-xs sm:text-sm text-gray-600">REST APIs, GraphQL, Agile, Scrum</p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Education
        </h2>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Bachelor of Computer Science</h3>
            <p className="text-sm sm:text-base text-gray-600">University of Technology</p>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">2016 - 2020</span>
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 border-b border-gray-200 pb-2">
          Notable Projects
        </h2>
        <div className="space-y-2 sm:space-y-3">
          <div>
            <h4 className="font-medium text-gray-700 text-sm sm:text-base">E-commerce Platform</h4>
            <p className="text-xs sm:text-sm text-gray-600">Built a full-stack e-commerce solution with React, Node.js, and MongoDB</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 text-sm sm:text-base">Task Management App</h4>
            <p className="text-xs sm:text-sm text-gray-600">Developed a collaborative task management tool with real-time updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template1
