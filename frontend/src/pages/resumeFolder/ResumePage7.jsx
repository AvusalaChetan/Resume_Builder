import { useState, useEffect, useRef } from "react";
import Template1 from "../resumeTemplates/Template1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
// import { MdMenuOpen,MdMenuClose } from "react-icons/md";

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
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/resume");
        setName(res.data?.name);
        setTitle(res.data.title);
        setPersonalDetails(res.data.personal);
        setSkills(res.data.skills);
        setProjects(res.data.projects || []);
        setCertificate(res?.data?.certifications || []);
        setEducation(res.data.education || []);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const handleClick = async () => {
    const temp = templateRef.current;
    if (!temp) return;

    try {
      const contentHeight = temp.scrollHeight;
      const canvas = await html2canvas(temp, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        height: contentHeight,
        windowHeight: contentHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgHeight / imgWidth;
      const pdfHeight = pageWidth * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
      pdf.textWithLink("Portfolio", 10, pdfHeight + 10, {
        url: personalDetails.portfolio,
      });
      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-[90vw]  bg-gray-50 p-6 text-black border mx-auto">
      <div className="h-full w-fit  flex justify-between gap-6 flex-row-reverse border mx-auto">
        <Button // to show template
          onClick={() => {
            setShowClose(!showClose);
          }}
          value={showClose ? "x" : "o"}
        />{" "}
        {showClose ? (
          <div className="w-[25vw] h-full border flex flex-col items-center">
            <Button // to show template
              onClick={() => {
                setShowClose(!showClose);
              }}
              value={showClose ? "x" : "o"}
            />
            <div className="flex justify-between">
              <h3>templates</h3>
            </div>
            <div>all templates</div>
          </div>
        ) : null}
        <div
          id="final-resume"
          className=" mx-auto bg-white shadow-lg"
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
      </div>

      <div className="mt-18" />
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default ResumePage7;
