import { Link,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, } from "react";
import Error from "../components/Error";
import { FullPageLoading } from "../components/Loding";

const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    message:'',
    status:''
  })
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
   try {
    const res = await axios.post('/api/auth/login',data,{withCredentials:true});
    console.log('res data',res.data,res)
    if(res.status === 200) navigate('/home')

   } catch (error) {
    console.log(error.message)
    setError({message: error.response?.data?.message || "Registration failed",
        status: error.response?.status || 500,})
   } 
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold capitalize mb-6 ">Resume_Builder</h1>
        <Link
          to="/register"
          className="border h-fit w-fit px-4 py-1 rounded-sm hover:bg-gray-300 border-gray-400 font-semibold"
        >
          show register
        </Link>
      </div>

      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md bg-white/10 shadow-sm border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold capitalize text-lg">Welcome Back</h3>
          <p className="text-gray-500 text-sm mb-6">
            Enter your email and password to access your account
          </p>
          {isSubmitting && <FullPageLoading />}
          
          <form 
          onSubmit={handleSubmit(onSubmit)}
        >
            <label className="capitalize font-semibold block mb-1">email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-gray-400 focus:ring-0 placeholder-gray-400"
              placeholder="enter email"
              {...register("email")}
            />

            <label className="capitalize font-semibold block mb-1">
              password
            </label>
            <input
              type="password"
              autoComplete="auto"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-gray-400 focus:ring-0 placeholder-gray-400"
              placeholder="enter password"
              {...register("password")}
            />

            <input
              type="submit"
              value="Login"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:cursor-pointer transition mt-3.5"
            />
          </form>

        <div className="mt-7">
        {error.message && <Error error={error.message} />}
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
