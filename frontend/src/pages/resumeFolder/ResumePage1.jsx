import { useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Error, { Success } from "../../components/Error";
import { DotsLoading, FullPageLoading } from "../../components/Loding";



const ResumePage1 = () => {

  const navigate = useNavigate();
  // export
  const [resumeId, setResumeId] = useState(null);
  // const [createdAt, setCreatedAt] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState(null)
  const [sucessfull, setSucessfull] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/resume', data,{withCredentials:true})
      console.log("resume data", response.data)
      setResumeId(response.data.newResume._id)
      setSucessfull(response.data.message)
      setServerError(null)
    } catch (error) {
      console.log(error.message)
      console.log("error data", error.response?.data);
      setServerError(error.response?.data)
    }
  }
  // expport
  const handleNextStep = () => {
    if (resumeId) {
      navigate(`/create_resume?step=2&resumeId=${resumeId}`);
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-2.5 justify-center bg-gray-50">
      {isSubmitting && (<FullPageLoading />)}
      <h3> resume for only freshers </h3>
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Create Resume</h2>
        {serverError && (
          <div className="mt-5">
            <Error error={serverError.message} />
          </div>
        )}

        {sucessfull && (
          <div className=" mb-5 ">
          <Success success={sucessfull} /> 
          <p className="text-green-700 text-lg font-bold">click continue and move on</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div>
            <label htmlFor="title">title</label> <br />
            <input type="text" {...register('title', {
              required: true
            })} placeholder='enter title for resuem ' /><br />
          </div>
          
          <div>
            <label htmlFor="name">name</label> <br />
            <input
              {...register('name', {
                required: true
              })} className="border" placeholder="enter name you" id="name" />
          </div>

          <input type="submit" value="submit" />
        </form>
      </div>
      <div>
        <button
          onClick={handleNextStep}
          className='border px-4 py-2 rounded-2xl mt-3.5 hover:bg-sky-400 font-bold'>count --{'>'}</button>
      </div>


    </div>
  );
};

export default ResumePage1;