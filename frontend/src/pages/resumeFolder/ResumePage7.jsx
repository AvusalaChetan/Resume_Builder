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

  const [searchParams, setSearchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || "222";
  const templateRef = useRef();

  const handleClick = async () => {
    const temp = templateRef.current;
    if (!temp) {
      console.error("Template element not found");
      return;
    }

    try {
      // Force desktop layout for PDF generation
      const originalClasses = temp.className;
      temp.className = "w-full mx-auto bg-white shadow-lg desktop-pdf-mode";

      // Add CSS to force desktop sizing
      const style = document.createElement("style");
      style.textContent = `
        .desktop-pdf-mode {
          min-width: 800px !important;
          max-width: 800px !important;
          padding: 32px !important;
        }
        .desktop-pdf-mode * {
          font-size: inherit !important;
        }
        .desktop-pdf-mode h1 {
          font-size: 24px !important;
        }
        .desktop-pdf-mode h2 {
          font-size: 18px !important;
        }
        .desktop-pdf-mode p, .desktop-pdf-mode li {
          font-size: 12px !important;
        }
        .desktop-pdf-mode .text-2xl { font-size: 24px !important; }
        .desktop-pdf-mode .text-lg { font-size: 16px !important; }
        .desktop-pdf-mode .text-base { font-size: 14px !important; }
        .desktop-pdf-mode .text-sm { font-size: 12px !important; }
        .desktop-pdf-mode .text-xs { font-size: 10px !important; }
        .desktop-pdf-mode .p-4 { padding: 16px !important; }
        .desktop-pdf-mode .mb-4 { margin-bottom: 16px !important; }
        .desktop-pdf-mode .mb-6 { margin-bottom: 24px !important; }
      `;
      document.head.appendChild(style);

      const canvas = await html2canvas(temp, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: 1000,
      });

      // Remove the temporary style
      document.head.removeChild(style);

      // Restore original classes
      temp.className = originalClasses;

      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions: 210mm x 297mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate image dimensions to fit on one page
      const margin = 15; // 15mm margins
      const imgWidth = pageWidth - 2 * margin; // 180mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If image height exceeds page height, scale it down
      let finalImgHeight = imgHeight;
      let finalImgWidth = imgWidth;

      if (imgHeight > pageHeight - 2 * margin) {
        finalImgHeight = pageHeight - 2 * margin; // 267mm
        finalImgWidth = (canvas.width * finalImgHeight) / canvas.height;
      }

      // Center the image on the page
      const xPos = (pageWidth - finalImgWidth) / 2;
      const yPos = (pageHeight - finalImgHeight) / 2;

      // Add image to single page
      pdf.addImage(data, "PNG", xPos, yPos, finalImgWidth, finalImgHeight);

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/resume");
        console.log(res?.data);
        console.log("res?.data?.certifications", res?.data[0]?.certifications);

        setName(res.data[0].name);
        setPersonalDetails(res.data[0].personal);
        setSkills(res.data[0].skills);
        setProjects([...projects, ...res.data[0].projects]);
        setCertificate([...certificate, ...res?.data[0]?.certifications]);
        console.log(res.data[0].projects);
      } catch (error) {
        console.log(error.message);
        console.log(error.res?.data?.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log("name state",name)
    // console.log("personal state",personalDetails)
    // console.log("skill state",skills)
    console.log("projects state", projects);
    console.log("certificate state", certificate);
  }, [name, personalDetails, projects, certificate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Choose Template
      </h1>

      <div
        id="final-resume"
        ref={templateRef}
        className="w-full mx-auto bg-white shadow-lg"
      >
        <Template1
          personal={personalDetails}
          name={name}
          skills={skills}
          projects={projects}
          certificate={certificate}
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
