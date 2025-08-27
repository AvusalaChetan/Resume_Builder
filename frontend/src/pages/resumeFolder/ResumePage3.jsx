import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Error, { Success } from "../../components/Error";
import { FullPageLoading, DotsLoading } from "../../components/Loding";
import {
  AcademicCapIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const ResumePage3 = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "3";
  const resumeId = searchParams.get("resumeId") || "222";
  const [educationEntries, setEducationEntries] = useState([{ id: 1 }]);
  const [success, setSuccess] = useState("");
  const [isDegree, setIsDegree] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { id: Date.now() }]);
  };

  const removeEducationEntry = (id) => {
    setEducationEntries(educationEntries.filter((entry) => entry.id !== id));
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, data);
      setSuccess(res.data?.message);
      console.log(res.data)
    } catch (error) {
      console.log(error.message);
      console.log(error?.res?.data?.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    tap: { scale: 0.95 },
  };

  if (isSubmitting) {
    return <FullPageLoading />;
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Education Details
          </motion.h1>
          <motion.p
            className="text-gray-500 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Provide your educational background below.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-xl shadow p-8 border border-gray-200"
          variants={itemVariants}
        >
          {success && <Success success={success} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {educationEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Entry #{index + 1}
                  </h3>
                  {educationEntries.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeEducationEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Select which education you want to add:
                    </label>
                    <select
                      {...register(`education.${index}.level`,{
   required: "this field is required",
   onChange: (e) =>  setIsDegree(e.target.value)
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm"
                    >
                      <option value="">-- Choose an option --</option>
                      <option value="School">School</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Degree">Degree</option>
                    </select>
                    {isDegree == "Degree" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Degree name
                        </label>
                        <input
                          type="text"
                          {...register(`education.${index}.degreeName`)}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                          placeholder="enter which degree you are doing"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      {...register(`education.${index}.institution`, {
                        required: "Institution is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      placeholder="University/College name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Course
                    </label>
                    <input
                      type="text"
                      {...register(`education.${index}.course`, {
                        required: "course is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      placeholder="enter course"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register(`education.${index}.startYear`, {
                        required: "Start date is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      {...register(`education.${index}.endYear`, {
                        required: "End date is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    />
                    <input type="checkbox" /> <label>Ongoing</label>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              type="button"
              onClick={addEducationEntry}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-500 hover:text-gray-800"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="w-5 h-5 inline mr-2" />
              Add Another Education
            </motion.button>

            <motion.div
              className="flex justify-between pt-6"
              variants={itemVariants}
            >
              <motion.button
                type="button"
                onClick={() =>
                  navigate(`/create_resume/page2?step=2&resumeId=${resumeId}`)
                }
                className="flex items-center gap-2 px-6 py-3 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Previous
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? "Saving..." : "Save & Continue"}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumePage3;
