import { useState } from "react";
import axios from "axios";
import { FullPageLoading, DotsLoading } from "../components/Loding";
import { useForm } from "react-hook-form";
import Error, { Success } from "../components/Error";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate()
  const [registerError, setRegisterError] = useState({
    message: "",
    status: "",
  });
  const [otpError, setOtpError] = useState({
    message: "",
    status: "",
  });
  const [success, setSuccess] = useState({
    message: null,
    status: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmitDetails = async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);
      if (res.status === 200) {
        setRegisterError({
          message: null,
          status: null,
        });
      }
      setRegisterError({
        message: null,
        status: null,
      })
      setShowOtpField(true);
      console.log(data, res.data);
    } catch (error) {
      console.log(error.message);
      console.log("Error response:", error.response?.data);
      console.log("Status:", error.response?.status);
      setRegisterError({
        message: error.response?.data?.message || "Registration failed",
        status: error.response?.status || 500,
      });
    }
  };

  const onSubmitOtp = async (data) => {
    try {
      const res = await axios.post("/api/auth/register/verify-otp", data);
      console.log(res.data);

      if (res.status === 200) {
        setOtpError({
          message: null,
          status: "",
        });
        setSuccess({ message: res.data, status: res.status });
        navigate('/home')

      }
    } catch (error) {
      setOtpError({
        message: error.response?.data?.message || "OTP verification failed",
        status: error.response?.status || 500,
      });
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold capitalize mb-6 ">Resume_Builder</h1>
        <Link
          to="/login"
          className="border h-fit w-fit px-4 py-1 rounded-sm hover:bg-gray-300 border-gray-400 font-semibold"
        >
          show login
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center bg-white px-4">
        {isSubmitting && <FullPageLoading />}

        {registerError.message && <Error error={registerError.message} />}

        <div className="w-full max-w-md bg-white/10 shadow-sm border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold capitalize text-lg">Create Account</h3>
          <p className="text-gray-500 text-sm mb-6">
            Enter your details to create your resume builder account
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmitDetails)}>
            <div>
              <label
                htmlFor="name"
                className="capitalize font-semibold block mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="enter name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "this feild is require",
                  },
                  minLength: {
                    value: 3,
                    message: "too short ",
                  },
                })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-gray-400 focus:ring-0 placeholder-gray-400"
              />
              {errors.name && (
                <p className="text-red-600">
                  {" "}
                  name should be max of 3 letters{" "}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="capitalize font-semibold block mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Email is too short",
                  },
                })}
                className={`w-full px-4 py-2 border-2 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300"
                  }`}
              />

              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="capitalize font-semibold block mb-1"
              >
                password
              </label>
              <input
                id="password"
                type="password"
                placeholder="enter password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "too short ",
                  },
                  maxLength: {
                    value: 8,
                    message: "too long ",
                  },
                })}
                autoComplete="password"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-gray-400 focus:border-gray-300 focus:ring-0 placeholder-gray-400"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <input
              type="submit"
              disabled={isSubmitting}
              value="Create Account"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:cursor-pointer transition"
            />
          </form>
        </div>

        {/* //=============================================================================================================================================== */}

        {showOtpField && (
          <div className="w-full max-w-md bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mt-6">
            {otpError.message ? (
              <Error error={otpError.message} />
            ) : (
              <Success success={success.message} />
            )}

            <h3 className="font-semibold text-lg">Verify Your Email</h3>
            <p className="text-gray-500 text-sm mb-4">
              Enter the 6-digit code sent to your email address
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmitOtp)}>
              <label
                htmlFor="otp"
                className="capitalize font-semibold block mb-1"
              >
                OTP
              </label>
              <div className="mb-4">
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  aria-invalid={errors.inputOtp ? "true" : "false"}
                  aria-describedby={errors.inputOtp ? "otp-error" : undefined}
                  {...register("inputOtp")}
                  className={`w-full px-4 py-2 border-2 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${errors.inputOtp
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300"
                    }`}
                />
                {/* input vlaidation error  */}
                {errors.inputOtp && (
                  <p id="otp-error" className="mt-1 text-sm text-red-600">
                    {errors.inputOtp.message}
                  </p>
                )}
              </div>

              <input
                type="submit"
                value="submit"
                className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:cursor-pointer transition"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
