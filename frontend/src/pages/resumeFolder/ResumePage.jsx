import { useSearchParams } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import ResumePage1 from "./ResumePage1";
import ResumePage2 from "./ResumePage2";
import ResumePage3 from "./ResumePage3";
import ResumePage4 from "./ResumePage4";
import ResumePage5 from "./ResumePage5";
import ResumePage6 from "./ResumePage6";
import ResumePage7 from "./ResumePage7";
import Preview from "../resumeTemplates/Preview";

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
    certifications: [],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "1";
  const resumeId = searchParams.get("resumeId") || null;

  const steps = [
    { step: "1", page: <ResumePage1 /> },
    { step: "2", page: <ResumePage2 /> },
    { step: "3", page: <ResumePage3 /> },
    { step: "4", page: <ResumePage4 /> },
    { step: "5", page: <ResumePage5 /> },
    { step: "6", page: <ResumePage6 /> },
    { step: "7", page: <ResumePage7 /> },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex flex-col lg:flex-row h-full w-full border">
        <aside className="flex flex-row lg:flex-col items-center lg:items-start justify-start py-4 px-2 sm:py-6 sm:px-4 bg-white/80 border-b lg:border-b-0 lg:border-r border-gray-200 shadow-md lg:min-w-[180px] w-full lg:w-auto">
          <h2 className="hidden lg:block text-lg font-bold mb-6 text-blue-700">
            Steps
          </h2>
          <div className="flex flex-row lg:flex-col gap-2 sm:gap-4 w-full overflow-x-auto lg:overflow-visible">
            {steps.map((item, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setSearchParams({ step: item.step, resumeId: resumeId })
                }
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200
                  ${step == item.step
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                  }`}
              >
                Step {item.step}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-8 py-6 px-3 sm:px-6">
          <section className="w-full lg:w-1/2 flex items-center justify-center">
            {step === "1" && (
              <ResumePage1 formData={formData} setFormData={setFormData} />
            )}
            {step === "2" && (
              <ResumePage2 formData={formData} setFormData={setFormData} />
            )}
            {step === "3" && (
              <ResumePage3 formData={formData} setFormData={setFormData} />
            )}
            {step === "4" && (
              <ResumePage4 formData={formData} setFormData={setFormData} />
            )}
            {step === "5" && (
              <ResumePage5 formData={formData} setFormData={setFormData} />
            )}
            {step === "6" && (
              <ResumePage6 formData={formData} setFormData={setFormData} />
            )}
          </section>
            {step === "7" && (
              <Suspense fallback={<div className="">Loading...</div>}>
                <LazyResumePage7 />
              </Suspense>
            )}

          <section className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
            {step === "7" ? null : (
              <div className="w-full max-w-2xl h-full  rounded-xl shadow bg-white lg:mr-12">
                <Preview formData={formData} education={formData.education} />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResumePage;
