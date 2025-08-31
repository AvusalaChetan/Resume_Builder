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
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl text-center mb-6 font-semibold uppercase">
        Certifications
      </h1>
      <div className="border p-6 rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-4"
        >
          <InputField
            label={"course name"}
            type="text"
            placeholder={"enter course name"}
            {...register("course_name", {
              required: true,
              onChange: (e) => {
                setFormData(prev => ({
                  ...prev,
                  certifications: [{
                    ...prev.certifications?.[0],
                    courseName: e.target.value,
                    provider: prev.certifications?.[0]?.provider || "",
                    link: prev.certifications?.[0]?.link || ""
                  }]
                }));
              },
            })}
          />

          <InputField
            label={"University / Provider"}
            type="text"
            placeholder="Enter university or provider name"
            {...register("certificate_provider", {
              onChange: (e) => {
                setFormData(prev => ({
                  ...prev,
                  certifications: [{
                    ...prev.certifications?.[0],
                    courseName: prev.certifications?.[0]?.courseName || "",
                    provider: e.target.value,
                    link: prev.certifications?.[0]?.link || ""
                  }]
                }));
              },
            })}
          />

          <InputField
            label={"certificate Link"}
            type="text"
            placeholder="Enter  certificate link"
            {...register("certificate_Link", {
              onChange: (e) => {
                setFormData(prev => ({
                  ...prev,
                  certifications: [{
                    ...prev.certifications?.[0],
                    courseName: prev.certifications?.[0]?.courseName || "",
                    provider: prev.certifications?.[0]?.provider || "",
                    link: e.target.value
                  }]
                }));
              },
            })}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default ResumePage6;
