import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Success } from "../../components/Error";
import axios from "axios";
import InputField from "../../components/InputFeild";

const ResumePage4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || "222";
  const [skills, setSkills] = useState(formData.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [techstack, setTechstack] = useState(formData.techstack || []);
  const [newTechStack, setNewTechStack] = useState("");
  const [message, setMessage] = useState({
    error: null,
    successMessage: null,
  });

  const handileOnClick = (newSorT, arrSorT, setfn, formDataKey) => {
    if (!newSorT.trim()) return;
    const updatedArray = [...arrSorT, newSorT];
    setfn(updatedArray);
    setFormData({ ...formData, [formDataKey]: updatedArray });
  };

  const remove = (arrSorT, removeItemIdx, setfn, formDataKey) => {
    const updatedArray = arrSorT.filter((_, idx) => idx !== removeItemIdx);
    setfn(updatedArray);
    setFormData({ ...formData, [formDataKey]: updatedArray });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = async () => {
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, {
        skill: skills,
        techstack: techstack,
      });
      setMessage({ error: null, successMessage: res.data?.message });
    } catch (error) {
      setMessage({ error: error.res?.data?.message, successMessage: null });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center px-4 py-8">
  <header
   
    className="mb-10 text-center"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
      Skills & Tech Stack
    </h1>
    <p className="text-gray-500 text-lg font-medium">
      Highlight your expertise with elegance
    </p>
  </header>

  <form
    onSubmit={handleSubmit(formSubmit)}
   
    className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-gray-200"
  >
    <>
      {message.successMessage && (
        <div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6"
        >
          <Success success={message.successMessage} />
        </div>
      )}
    </>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Skills */}
      <div>
        <label className="block font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">
          Languages
        </label>
        <div className="flex gap-3">
        
          <InputField
            {...register("skill", {
              onChange: (e) => setNewSkill(e.target.value),
            })}
            type="text"
            value={newSkill}
            placeholder="e.g. JavaScript"
          
          />
          <button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              handileOnClick(newSkill, skills, setSkills, "skills");
              setNewSkill("");
            }}
            type="button"
            className=" px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition"
          >
            Add
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <>
            {skills.map((skill, idx) => (
              <div
                key={skill + idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium shadow-sm"
              >
                <span>{skill}</span>
                <button
                  onClick={() => remove(skills, idx, setSkills, "skills")}
                  className="text-gray-500 hover:text-red-500 transition"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </>
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block font-semibold mb-3 text-gray-700 text-sm uppercase tracking-wide">
          Tech Stack
        </label>
        <div className="flex gap-3">
    
          <InputField
             type="text"
            value={newTechStack}
            className="border border-gray-300 py-2.5 px-4 rounded-xl focus:border-gray-700 focus:ring-1 focus:ring-gray-600 transition w-full bg-white/60 placeholder-gray-400"
            placeholder="e.g. React, Node.js"
            {...register("techStack", {
              onChange: (e) => setNewTechStack(e.target.value),
            })}
          />
          <button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              handileOnClick(newTechStack, techstack, setTechstack, "techstack");
              setNewTechStack("");
            }}
            type="button"
            className=" px-5 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition"
          >
             Add
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <>
            {techstack.map((tech, idx) => (
              <div
                key={tech + idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium shadow-sm"
              >
                <span>{tech}</span>
                <button
                  onClick={() => remove(techstack, idx, setTechstack, "techstack")}
                  className="text-gray-500 hover:text-red-500 transition"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>

    {/* Submit */}
    <div
      
      className="mt-10 text-center"
    >
      <button
        type="submit"
        className="bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold py-3 px-10 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  </form>
</div>

  );
};

export default ResumePage4;
