import { Link,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, } from "react";
import Error from "../components/Error";
import { FullPageLoading } from "../components/Loding";
import { LinkBtn } from "../components/Button";
import  HeadingTitle from '../components/HeadingTitle'
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
  <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-8">
  <div className="flex justify-between items-center mb-12">
    <div className="flex items-center">      
        <HeadingTitle/>
    </div>
    <LinkBtn to="/register" value={'create account'}/>
  </div>

  <div className="flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <div className="mb-8 text-center">
        <h3 className="font-bold text-2xl text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-gray-500 text-sm">
          Enter your credentials to access your account
        </p>
      </div>
      
      {isSubmitting && <FullPageLoading />}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="Enter your email"
            {...register("email")}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
          </div>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none placeholder-gray-400"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3.5 rounded-lg hover:shadow-lg transition-all duration-200 focus:ring-4 focus:ring-blue-200"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-6">
        {error.message && <Error error={error.message} />}
      </div>
    </div>
  </div>
</div>);
};

export default LoginPage;
