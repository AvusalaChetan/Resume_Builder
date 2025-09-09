import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error, { Success } from "../../components/Error";
import axios from "axios";
import InputField from "../../components/InputFeild";
const ResumePage6 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId") || null;
  const [techstackUsed, setTechstackUsed] = useState([]);
  const [message, setMessage] = useState({
    error: null,
    successMessage: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, data);
      console.log(res.data)

    } catch (error) {
      console.log(error.message)
    }
  };

  return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow">
    {/* Heading */}
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6 uppercase">
      Certifications
    </h1>

    {/* Form */}
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-6">
      {/* Course Name */}
      <InputField
        label="Course Name"
        type="text"
        placeholder="Enter course name"
        {...register("course_name", {
          required: true,
          onChange: (e) => {
            setFormData((prev) => ({
              ...prev,
              certifications: [
                {
                  ...prev.certifications?.[0],
                  courseName: e.target.value,
                  provider: prev.certifications?.[0]?.provider || "",
                  link: prev.certifications?.[0]?.link || "",
                },
              ],
            }));
          },
        })}
      />

      {/* Provider */}
      <InputField
        label="University / Provider"
        type="text"
        placeholder="Enter university or provider name"
        {...register("certificate_provider", {
          onChange: (e) => {
            setFormData((prev) => ({
              ...prev,
              certifications: [
                {
                  ...prev.certifications?.[0],
                  courseName: prev.certifications?.[0]?.courseName || "",
                  provider: e.target.value,
                  link: prev.certifications?.[0]?.link || "",
                },
              ],
            }));
          },
        })}
      />

      {/* Certificate Link */}
      <InputField
        label="Certificate Link"
        type="text"
        placeholder="Enter certificate link"
        {...register("certificate_Link", {
          onChange: (e) => {
            setFormData((prev) => ({
              ...prev,
              certifications: [
                {
                  ...prev.certifications?.[0],
                  courseName: prev.certifications?.[0]?.courseName || "",
                  provider: prev.certifications?.[0]?.provider || "",
                  link: e.target.value,
                },
              ],
            }));
          },
        })}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Save Certification
      </button>
    </form>
  </div>
</div>

  );
};

export default ResumePage6;
