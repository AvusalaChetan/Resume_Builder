import { useSearchParams, useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import ResumePage1 from "./ResumePage1";
import ResumePage2 from "./ResumePage2";
import ResumePage3 from "./ResumePage3";
import ResumePage4 from "./ResumePage4";
import ResumePage5 from "./ResumePage5";
import ResumePage6 from "./ResumePage6";
import ResumePage7 from "./ResumePage7";
import Preview from "../resumeTemplates/Preview";
import Button, { Button2 } from "../../components/Button";

const ResumePage = () => {
  const LazyResumePage7 = lazy(() => import("./ResumePage7"));
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    pNumber: "",
    city: "",
    portfolio: "",
    about: "",
    level: [],
    skills: [],
    techstack: [],
    projects: [],
    certifications: []
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "1";
  const resumeId = searchParams.get("resumeId") || null;
  const arr = [
    { step: "1", page: <ResumePage1 /> },
    { step: "2", page: <ResumePage2 /> },
    { step: "3", page: <ResumePage3 /> },
    { step: "4", page: <ResumePage4 /> },
    { step: "5", page: <ResumePage5 /> },
    { step: "6", page: <ResumePage6 /> },
    { step: "7", page: <ResumePage7 /> },
  ];

  return (
    <>
      <div className="h-16 w-[80%] flex-wrap  flex items-center justify-between border mx-auto mt-15 ">
        <h2 className="capitalize text-2xl ml-23">{formData.title}</h2>
        <div className="mr-23">
          <Button2 type={"button"} value={"template"} />
        </div>
      </div>

      <div className="flex items-center justify-around gap-5 w-[90%] mx-auto">
        {step === "1" && (
          <div className="w-1/2  mt-12">
            <ResumePage1 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "2" && (
          <div className="w-1/2  mt-12">
            <ResumePage2 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "3" && (
          <div className="w-1/2  mt-12">
            <ResumePage3 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "4" && (
          <div className="w-1/2  mt-12">
            <ResumePage4 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "5" && (
          <div className="w-1/2  mt-12">
            <ResumePage5 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "6" && (
          <div className="w-1/2  mt-12">
            <ResumePage6 formData={formData} setFormData={setFormData} />
          </div>
        )}
        {step === "7" && (
          <Suspense fallback={<div className="">Loading...</div>}>
            <LazyResumePage7 />
          </Suspense>
        )}

        <div className="">
          {step === '7' ? null : (<Preview formData={formData} education={formData.education} />
          )}
        </div>  

      </div>
      {/* stepsbuttons */}
      <div
        style={{ marginTop: "20px" }}
        className="mb-12 flex items-center gap-6 border w-fit m-auto py-4 px-5 rounded-full"
      >
        {arr.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() =>
                setSearchParams({ step: item.step, resumeId: resumeId })
              }
            >
              Step {item.step}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ResumePage;
