import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import  { Success } from "../../components/Error";
import axios from "axios";

const ResumePage4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || "222";
  const [skills, setSkills] = useState(formData.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [techstack, setTechstack] = useState(formData.techstack || []);
  const [newTechStack, setNewTechStack] = useState("");
const [message, setMessage] = useState({
  error:null,
  successMessage:null
})

  const handileOnClick = (newSorT, arrSorT, setfn, formDataKey) => {
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
        techstack: techstack
      });

      console.log(res.data);
      setMessage({error:null,successMessage:res.data?.message})
    } catch (error) {
      console.log(error.message);
      console.log(error.res?.data?.message);
    }
  };

  return (
    <div className="p-5 border">
      <header className="border text-center mb-5">
        <h1 className="text-4xl capitalize"> add skill </h1>
      </header>
      <div>

      </div>
      <form className="border px-4 py-6" onSubmit={handleSubmit(formSubmit)}>
        <div>
         
         { message.successMessage && <Success success={message.successMessage}/>}
        </div>
        <div className="complete-wrapper">
          <label className="block">add skill</label>
          <div className="add-skill-wrappes-i/p&btn ">
            <input
              type="text"
              value={newSkill}
              className="border py-2 rounded-lg px-4"
              placeholder="add lang you know "
              {...register("skill", {
                onChange: (e) => {
                  setNewSkill(e.target.value);
                  // Update formData skills array in real time as you type
                  const currentSkills = Array.isArray(formData.skills) ? [...formData.skills] : [];
                  if (e.target.value.trim()) {
                    currentSkills[skills.length] = e.target.value;
                  }
                  setFormData({ ...formData, skills: currentSkills });
                },
              })}
            />
            <button
              onClick={() => {
                handileOnClick(newSkill, skills, setSkills, 'skills');
                setNewSkill(""); // Clear input after adding
              }}
              type="button"
              className="add ml-3 border rounded-lg px-4 py-2 capitalize"
            >
              {" "}
              +add{" "}
            </button>
          </div>

          <label className="block">add tech stack</label>
          <div className="add-techstack-wrappes-i/p&btn ">
            <input
              type="text"
              value={newTechStack}
              className="border py-2 rounded-lg px-4"
              placeholder="add teck stack"
              {...register("techStack", {
                onChange: (e) => {
                  setNewTechStack(e.target.value);
                  // Update formData techstack array in real time as you type
                  const currentTechstack = Array.isArray(formData.techstack) ? [...formData.techstack] : [];
                  if (e.target.value.trim()) {
                    currentTechstack[techstack.length] = e.target.value;
                  }
                  setFormData({ ...formData, techstack: currentTechstack });
                },
              })}
            />
            <button
              onClick={() => {
                handileOnClick(newTechStack, techstack, setTechstack, 'techstack');
                setNewTechStack(""); // Clear input after adding
              }}
              type="button"
              className="ml-3 border rounded-lg px-4 py-2 capitalize"
            >
              +add{" "}
            </button>
          </div>

          <div className="wrapper-i/p-submit">
            <input
              type="submit"
              value="submit"
              className="mt-3 border rounded-lg px-4 py-2  capitalize"
            />
          </div>
        </div>
      </form>

      <div className="border w-full h-50 my-3 mx-auto flex items-center justify-center gap-1">
        <div className="left w-1/2 border h-full">
          <p className="font-semibold  text-center py-2 px-4">
            Selected Skills
          </p>
          <div className="show-skill  flex items-center justify-center gap-2 ">
            {skills.map((skill, idx) => {
              return (
                <div
                  key={idx}
                  className="w-fit rounded-lg px-2 py-2 border flex items-center justify-between gap-2 "
                >
                  <p>{skill}</p>
                  <button
                    onClick={() => {
                      remove(skills, idx, setSkills, 'skills');
                    }}
                    className="text-white bg-red-400 rounded-lg px-2"
                  >
                    R
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="right w-1/2 border h-full">
          <p className="font-semibold  text-center py-2 px-4">
            Selected techStack
          </p>
          <div className="show-skill  flex items-center justify-center gap-2 ">
            {techstack.map((skill, idx) => {
              return (
                <div
                  key={idx}
                  className="w-fit rounded-lg px-2 py-2 border flex items-center justify-between gap-2 "
                >
                  <p>{skill}</p>
                  <button
                    onClick={() => {
                      remove(techstack, idx, setTechstack, 'techstack');
                    }}
                    className="text-white bg-red-400 rounded-lg px-2"
                  >
                    R
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="add-skills-from-here"></div>
    </div>
  );
};

export default ResumePage4;
