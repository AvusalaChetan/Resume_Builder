import { useState, useEffect, useRef } from "react";
import Template1 from "../resumeTemplates/Template1";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResumePage7 = () => {
  const [personalDetails, setPersonalDetails] = useState({});
  const [name, setName] = useState("");
  const [skills, setSkills] = useState({});
  const [projects, setProjects] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [education, setEducation] = useState([]);
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || "222";
  const templateRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/resume");
        console.log("res?.data",res?.data);
       
        setName(res.data?.name);
        setTitle(res.data.title);
        setPersonalDetails(res.data.personal);
        setSkills(res.data.skills);
        setProjects(res.data.projects || []);
        setCertificate(res?.data?.certifications || []);
        setEducation(res.data.education || []);
        console.log(res.data.projects);
      } catch (error) {
        console.log(error.message);
        console.log(error.res?.data?.message);
      }
    };
    getData();
  }, []);
   // Empty dependency array since we only want to fetch once


  const handleClick = async () => {
    const temp = templateRef.current;
    if (!temp) {
      console.error("Template element not found");
      return;
    }

    try {
      const canvas = await html2canvas(temp, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width:temp.scrollWidth,
        height: temp.scrollHeight,
      });

      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Choose Template
      </h1>

      <div
        id="final-resume"
        className="w-full mx-auto bg-white shadow-lg "
        style={{ width: "794px", height: "1123px", margin: 0, padding: 0 }}
      >
        <Template1
          ref={templateRef}
          personal={personalDetails}
          name={name}
          skills={skills}
          projects={projects}
          certificate={certificate}
          education={education} 
        />
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePage7;
