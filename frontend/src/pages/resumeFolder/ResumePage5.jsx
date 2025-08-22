import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error, { Success } from "../../components/Error";
import axios from "axios";

const ResumePage5 = () => {
  
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

    setfn([...arrT, newT]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = async (data) => {

    const { projectName, projectLink, projectDescription } = data;
    const dataToDB = {
      projectName: projectName,
      projectLink:projectLink,
      projectDescription:projectDescription,
      techstackUsed:techstackUsed
    };
    try {
      const res = await axios.put(`/api/resume/${resumeId}`,dataToDB);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="border-b mb-6">
        <h1 className="text-center text-4xl font-semibold capitalize py-4">
          Projects
        </h1>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="border rounded-xl px-6 py-8 flex flex-col gap-6 w-full max-w-2xl mx-auto bg-white"
        >
          <div className="w-full">
            <label className="block mb-1 font-medium">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              {...register("projectName")}
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">
              Project Link (live demo or GitHub repo link)
            </label>
            <input
              type="text"
              placeholder="Enter live demo or GitHub repo link"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              {...register("projectLink")}
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 font-medium">
              Project Description
            </label>
            <textarea
              rows="3"
              placeholder="Add description in 2–3 lines"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
              {...register("projectDescription")}
            />
          </div>

          <div className="w-full">
            <div className="w-full">
              <label className="block mb-1 font-medium">
                Tech Stack used in project
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setNewTechStack(e.target.value);
                }}
                placeholder="Enter tech stack (e.g., React, Node.js)"
                className="min-w-2/3 border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...register("techStackUsed", {
                  onChange: (e) => {
                    setNewTechStack(e.target.value);
                  },
                })}
              />
              <button
                type="button"
                onClick={() =>
                  handileOnClick(newTechStack, techstackUsed, setTechstackUsed)
                }
                className=" border ml-2.5 px-4 py-2 rounded-lg capitalize"
              >
                add
              </button>
            </div>
            <div className="border mt-3">
              <p className="text-center text-lg capitalize">
                tech which are used
              </p>
              <div>
                {techstackUsed.map((item, idx) => {
                  return (
                    <div key={idx} className="px-3">
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full">
            <input
              type="submit"
              value="Submit"
              className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumePage5;
