import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error, { Success } from "../../components/Error";
import axios from "axios";

const ResumePage5 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || null;
  const [techstackUsed, setTechstackUsed] = useState([]);
  const [newTechStack, setNewTechStack] = useState("");
  const [message, setMessage] = useState({
    error: null,
    successMessage: null,
  });

  const handileOnClick = (newT, arrT, setfn) => {
    if (!newT.trim()) return;
    const updatedTechStack = [...arrT, newT.trim()];
    setfn(updatedTechStack);

    setFormData((prev) => ({
      ...prev,
      projects: [
        {
          ...prev.projects?.[0],
          title: prev.projects?.[0]?.title || "",
          link: prev.projects?.[0]?.link || "",
          description: prev.projects?.[0]?.description || "",
          technologies: updatedTechStack.join(", "),
        },
      ],
    }));
    setNewTechStack("");
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const formSubmit = async (data) => {
    const { projectName, projectLink, projectDescription } = data;
    const dataToDB = {
      projectName,
      projectLink,
      projectDescription,
      techstackUsed,
    };
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, dataToDB);
      console.log(res.data);
      setMessage({ error: null, successMessage: "Project saved successfully!" });
    } catch (error) {
      setMessage({ error: error.message, successMessage: null });
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-4xl font-bold  bg-clip-text  ">
          Showcase Your Project
        </h1>
      
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full max-w-2xl bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl px-8 py-10 shadow-2xl flex flex-col gap-6"
      >

        {message.successMessage && (
          <Success success={message.successMessage} />
        )}
        {message.error && <Error error={message.error} />}

        {/* Project Name */}
        <div>
          <label className="block mb-2 font-semibold ">
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter project name"
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
            {...register("projectName", {
              onChange: (e) => {
                setFormData((prev) => ({
                  ...prev,
                  projects: [
                    {
                      ...prev.projects?.[0],
                      title: e.target.value,
                      link: prev.projects?.[0]?.link || "",
                      description: prev.projects?.[0]?.description || "",
                      technologies: techstackUsed.join(", "),
                    },
                  ],
                }));
              },
            })}
          />
        </div>

        {/* Project Link */}
        <div>
          <label className="block mb-2 font-semibold">
            Project Link
          </label>
          <input
            type="text"
            placeholder="Live demo or GitHub link"
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
            {...register("projectLink", {
              onChange: (e) => {
                setFormData((prev) => ({
                  ...prev,
                  projects: [
                    {
                      ...prev.projects?.[0],
                      title: prev.projects?.[0]?.title || "",
                      link: e.target.value,
                      description: prev.projects?.[0]?.description || "",
                      technologies: techstackUsed.join(", "),
                    },
                  ],
                }));
              },
            })}
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block mb-2 font-semibold ">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Brief description in 2–3 lines"
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
            {...register("projectDescription", {
              onChange: (e) => {
                setFormData((prev) => ({
                  ...prev,
                  projects: [
                    {
                      ...prev.projects?.[0],
                      title: prev.projects?.[0]?.title || "",
                      link: prev.projects?.[0]?.link || "",
                      description: e.target.value,
                      technologies: techstackUsed.join(", "),
                    },
                  ],
                }));
              },
            })}
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block mb-2 font-semibold ">
            Tech Stack
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTechStack}
              placeholder="e.g. React, Node.js"
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
              {...register("techStackUsed", {
                onChange: (e) => setNewTechStack(e.target.value),
              })}
            />
            <button
              type="button"
              onClick={() =>
                handileOnClick(newTechStack, techstackUsed, setTechstackUsed)
              }
              className="px-6 py-2 rounded-xl  text-black font-medium shadow hover:scale-105 transition"
            >
              Add
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {techstackUsed.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 text-sm font-medium text-gray-800 shadow"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl  font-semibold shadow-lg hover:scale-[1.02] transition-all"
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumePage5;
