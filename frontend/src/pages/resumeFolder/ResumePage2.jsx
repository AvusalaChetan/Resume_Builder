import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DotsLoading, FullPageLoading } from "../../components/Loding";
import { ErrorText } from "../../components/Error";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import InputField, { TextArea } from "../../components/InputFeild";

const ResumePage2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") || "3";
  const resumeId = searchParams.get("resumeId") || "222";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, data);
      console.log("res.data", res.data);
    } catch (error) {
      console.log("error", error.message);
      console.log(error.res?.data?.message);
    }
  };

  return (
    <div className="ml-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {isSubmitting && <FullPageLoading />}

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Personal Information
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap items-center justify-between">
              {/* Email Field */}
              <span className="space-y-2 flex items-center gap-2 w-fit">
                <EnvelopeIcon className="w-5 h-5 text-green-500 mb-7" />
                <InputField
                  label={"Your Email"}
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                    onChange: (e) =>
                      setFormData({ ...formData, email: e.target.value }),
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && <ErrorText errortxt={errors.email.message} />}
              </span>

              {/* Phone Field */}
              <span className="space-y-2 flex items-center gap-2 w-fit">
                <PhoneIcon className="w-5 h-5 text-purple-500 mb-7" />
                <InputField
                  label={"Phone Number"}
                  type="tel"
                  id="phone"
                  {...register("mobileNumber", {
                    required: "Phone number is required",
                         onChange:(e)=>{
                    setFormData({...formData,pNumber:e.target.value})
                  }
                  })}
                  placeholder="Enter your phone number"
                />
                {errors.mobileNumber && (
                  <ErrorText errortxt={errors.mobileNumber.message} />
                )}
              </span>

              {/* City Field */}
              <span className="space-y-2 flex items-center gap-2 w-fit">
                <MapPinIcon className="w-5 h-5 text-orange-500 mb-7" />
                <InputField
                  label={"City"}
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required",     onChange:(e)=>{
                    console.log(e.target.value)
                    setFormData({...formData,city:e.target.value})
                  } })}
                  placeholder="Enter your city"
                />
                {errors.city && <ErrorText errortxt={errors.city.message} />}
              </span>

              {/* Portfolio */}
              <span className="space-y-2 flex items-center gap-2 w-fit">
                <LinkIcon className="w-5 h-5 text-blue-500 mb-7" />
                <InputField
                  label={"Portfolio"}
                  type="text"
                  id="portfolio"
                  {...register("portfolio",{     onChange:(e)=>{
                    console.log(e.target.value)
                    setFormData({...formData,portfolio:e.target.value})
                  }})}
                  placeholder="Enter your portfolio"
                />
                {errors.portfolio && (
                  <ErrorText errortxt={errors.portfolio.message} />
                )}
              </span>
            </div>

            {/* About field */}
            <div className="mt-6">
              <TextArea
                label={"About / Career Objective"}
                type="text"
                id="about"
                {...register("about", { required: "About is required",
                  onChange:(e)=>{
                    console.log(e.target.value)
                    setFormData({...formData,about:e.target.value})
                  }
                 })}
                placeholder="Enter about you"
              />
              {errors.about && <ErrorText errortxt={errors.about.message} />}
            </div>

            <div className="flex justify-between pt-6">
              <input
                type="submit"
                value="Save"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </form>

          <div className="flex items-center justify-around mt-5">
            <button
              type="button"
              onClick={() => navigate("/create_resume/")}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Previous
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/create_resume/?step=${Number(step) + 1}&resumeId=${resumeId}`
                )
              }
              className="flex items-center gap-2 px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              {isSubmitting ? "Saving..." : "Continue"}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage2;
