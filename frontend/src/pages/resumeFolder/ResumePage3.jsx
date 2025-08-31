import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error, { Success } from "../../components/Error";
import { FullPageLoading } from "../../components/Loding";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const ResumePage3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, data);

      setSuccess(res.data?.message);
      console.log("education",res.data);
    } catch (error) {
      console.log(error.message);
      console.log(error?.res?.data?.message);
    }
  };

  if (isSubmitting) {
    return <FullPageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Education Details
          </h1>
          <p className="text-gray-500 text-base">
            Provide your educational background below.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-8 border border-gray-200">
          {success && <Success success={success} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {educationEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="border border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Entry #{index + 1}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Select which education you want to add:
                    </label>
                    <select
                      {...register(`education.${index}.level`, {
                        required: "This field is required",
                        onChange: (e) => {
                          const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                          updated[index] = {
                            ...updated[index],
                            level: e.target.value
                          };
                          setFormData({ ...formData, level: updated });
                          setIsDegree(e.target.value);
                        }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-sm"
                    >
                      <option value="">-- Choose an option --</option>
                      <option value="School">School</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Degree">Degree</option>
                    </select>

                    {isDegree === "Degree" && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Degree name
                        </label>
                        <input
                          type="text"
                          {...register(`education.${index}.degreeName`, {
                            onChange: (e) => {
                              const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                              updated[index] = {
                                ...updated[index],
                                degreeName: e.target.value
                              };
                              setFormData({ ...formData, level: updated });
                            },
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                          placeholder="Enter which degree you are doing"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Institution Name
                    </label>
                    <input
                    type="text"
                      {...register(`education.${index}.institution`, {
                        required: "Institution is required",
                        onChange: (e) => {
                          const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                          updated[index] = {
                            ...updated[index],
                            name: e.target.value
                          };
                          setFormData({ ...formData, level: updated });
                        },
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
                        required: "Course is required",
                        onChange: (e) => {
                          const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                          updated[index] = {
                            ...updated[index],
                            course: e.target.value
                          };
                          setFormData({ ...formData, level: updated });
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                      placeholder="Enter course"
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
                        onChange: (e) => {
                          const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                          updated[index] = {
                            ...updated[index],
                            start: e.target.value
                          };
                          setFormData({ ...formData, level: updated });
                        },
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
                        onChange: (e) => {
                          const updated = Array.isArray(formData.level) ? [...formData.level] : [];
                          updated[index] = {
                            ...updated[index],
                            end: e.target.value
                          };
                          setFormData({ ...formData, level: updated });
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                    />
                    <input type="checkbox" /> <label>Ongoing</label>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducationEntry}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-500 hover:text-gray-800"
            >
              <PlusIcon className="w-5 h-5 inline mr-2" />
              Add Another Education
            </button>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() =>
                  navigate(`/create_resume/page2?step=2&resumeId=${resumeId}`)
                }
                className="flex items-center gap-2 px-6 py-3 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Previous
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save & Continue"}
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumePage3;
