import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Error, { Success } from "../../components/Error";
import { DotsLoading, FullPageLoading } from "../../components/Loding";
import InputField, { InputSubmit } from "../../components/InputFeild";
import Button from "../../components/Button";




const ResumePage1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  // export
  const [resumeId, setResumeId] = useState(null);
  // const [createdAt, setCreatedAt] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState(null);
  const [sucessfull, setSucessfull] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/resume", data, {
        withCredentials: true,
      });
      console.log("resume data", response.data);
      setResumeId(response.data.newResume._id);
      setSucessfull(response.data.message);
      setServerError(null);
    } catch (error) {
      console.log(error.message);
      console.log("error data", error.response?.data);
      setServerError(error.response?.data.message);
    }
  };
  const handleNextStep = () => {
    if (resumeId) {
      navigate(`/create_resume?step=2&resumeId=${resumeId}`);
    } else {
      alert('first fill submit the title and name')
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-4 justify-center py-10">
  {isSubmitting && <FullPageLoading />}
  <h1 className="text-3xl capitalize font-extrabold mb-6 text-blue-700">
    Resume For Only Freshers
  </h1>

  <div className="w-full max-w-2xl bg-white rounded-2xl p-10 shadow-xl min-h-[420px]">
    <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
      Create Resume
    </h2>

    {serverError && (
      <div className="mt-5">
        <Error error={serverError} />
      </div>
    )}

    {sucessfull && (
      <div className="mb-6">
        <Success success={sucessfull} />
        <p className="text-green-700 text-lg font-bold text-center">
          Click step 2 and move on
        </p>
      </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputField
        label={"Title"}
        type={"text"}
        placeholder="Enter title for resume"
        {...register("title", {
          required: true,
          onChange: (e) => setFormData({ ...formData, title: e.target.value }),
        })}
      />

      <InputField
        label={"Name"}
        {...register("name", {
          required: true,
          onChange: (e) => setFormData({ ...formData, name: e.target.value }),
        })}
        placeholder="Enter your name"
        id="name"
      />

      <InputSubmit type="submit" value="Submit" />
    </form>
  </div>

  <div className="mt-6">
    <Button value={"Next"} onClick={handleNextStep} />
  </div>
</div>

  );
};

export default ResumePage1;
