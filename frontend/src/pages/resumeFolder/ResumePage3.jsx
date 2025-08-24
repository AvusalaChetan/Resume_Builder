import React from 'react'
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const ResumePage3 = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "3";
  const resumeId = searchParams.get("resumeId") || "222";
  const [educationEntries, setEducationEntries] = useState([{ id: 1 }]);
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { id: Date.now() }]);
  };

  const removeEducationEntry = (id) => {
    setEducationEntries(educationEntries.filter(entry => entry.id !== id));
  };

  const onSubmit = async (data) => {
    console.log('Education Data:', data);
    // Handle form submission
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {resumeId}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <AcademicCapIcon className="w-10 h-10 text-green-500" />
            Education Details
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Add your educational background
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {educationEntries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                className="border-2 border-gray-100 rounded-xl p-6 bg-gray-50"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Education #{index + 1}
                  </h3>
                  {educationEntries.length > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => removeEducationEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Institution */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <AcademicCapIcon className="w-4 h-4 text-green-500" />
                      Institution Name
                    </label>
                    <input 
                      type="text" 
                      {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      placeholder="University/College name"
                    />
                  </div>

                  {/* Degree */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                      Degree/Course
                    </label>
                    <input 
                      type="text" 
                      {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                      placeholder="e.g., Bachelor of Technology"
                    />
                  </div>

                  {/* Start Year */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <CalendarIcon className="w-4 h-4 text-purple-500" />
                      Start Year
                    </label>
                    <input 
                      type="date" 
                      {...register(`education.${index}.startYear`, { 
                        required: 'Start year is required',
                        min: { value: 1950, message: 'Year must be after 1950' },
                        max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                      placeholder="e.g., 2018"
                    />
                  </div>

                  {/* End Year */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <CalendarIcon className="w-4 h-4 text-orange-500" />
                      End Year
                    </label>
                    <input 
                      type="date" 
                      {...register(`education.${index}.endYear`, { 
                        required: 'End year is required',
                        min: { value: 1950, message: 'Year must be after 1950' },
                        max: { value: new Date().getFullYear() + 10, message: 'Year cannot be too far in the future' }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                      placeholder="e.g., 2022"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add More Education Button */}
            <motion.button
              type="button"
              onClick={addEducationEntry}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusIcon className="w-5 h-5" />
              Add Another Education
            </motion.button>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex justify-between pt-6"
              variants={itemVariants}
            >
              <motion.button
                type="button"
                onClick={() => navigate(`/create_resume/page2?step=2&resumeId=${resumeId}`)}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
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
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? 'Saving...' : 'Save & Continue'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Progress Indicator
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Step 3 of 4</p>
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default ResumePage3;