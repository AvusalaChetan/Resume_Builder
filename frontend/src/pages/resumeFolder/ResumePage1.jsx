import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Error, { Success } from "../../components/Error";
import { DotsLoading, FullPageLoading } from "../../components/Loding";
import InputField ,{InputSubmit} from "../../components/InputFeild";
import Button from "../../components/Button";




const ResumePage1 = ({formData,setFormData}) => {
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
    }else{
      alert('first fill submit the title and name')
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-2.5 justify-center">
      {isSubmitting && <FullPageLoading />}
      <h1 className="text-2xl capitalize font-extrabold"> resume for only freshers </h1>
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          Create Resume
        </h2>

        {serverError && (
          <div className="mt-5">
            <Error error={serverError} />
          </div>
        )}

        {sucessfull && (
          <div className=" mb-5 ">
            <Success success={sucessfull} />
            <p className="text-green-700 text-lg font-bold">
              click continue and move on
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={"title"}
            type={"text"}
            placeholder="enter title for resuem"
            {...register("title", {
              required: true,
 onChange:(e) => setFormData({ ...formData, title: e.target.value })

            })}
          />

          <InputField
            label={"Name"}
            {...register("name", {
              required: true,
                onChange:(e) => setFormData({ ...formData, name: e.target.value })

            })}
            className="border"
            placeholder="enter name you"
            id="name"
          />
          <InputSubmit type="submit" value="submit" />
        </form>
      </div>
     
      <div>
        <Button value={"count"} onClick={handleNextStep}/>
      </div>
    </div>
  );
};

export default ResumePage1;
