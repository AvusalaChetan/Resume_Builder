import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { DotsLoading, FullPageLoading } from "../../components/Loding";

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline';

const ResumePage2 = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "3";
  const resumeId = searchParams.get("resumeId") || "222";
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(`/api/resume/${resumeId}`, data)
      console.log('res.data', res.data);
    } catch (error) {
      console.log('error', error.message);
      console.log(error.res?.data?.message)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },
    tap: { scale: 0.95 }
  };

  return (

    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
          {isSubmitting && (<FullPageLoading />)}

      <div className="max-w-2xl mx-auto">

        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-800 mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            Personal Information
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Tell us about yourself
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <EnvelopeIcon className="w-5 h-5 text-green-500" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <PhoneIcon className="w-5 h-5 text-purple-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register('mobileNumber', {
                  required: 'Phone number is required',
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </motion.div>

            {/* City Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPinIcon className="w-5 h-5 text-orange-500" />
                City
              </label>
              <input
                type="text"
                id="city"
                {...register('city', { required: 'City is required' })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                placeholder="Enter your city"
              />
              {errors.city && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.city.message}
                </motion.p>
              )}
            </motion.div>

            {/*about feild */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="about" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <PresentationChartBarIcon className="w-5 h-5 text-pink-500" />
                about
              </label>
              <textarea
                type="text"
                id="about"
                {...register('about', { required: 'about  is required' })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                placeholder="Enter about you"
              />
              {errors.city && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.city.message}
                </motion.p>
              )}
            </motion.div>

            {/* portfolio */}
            <motion.div variants={itemVariants} className="portfolio space-y-2">
              <label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <LinkIcon className="w-5 h-5 text-blue-500" />
                portfolio
              </label>
              <input
                type="text"
                id="portfolio"
                {...register('portfolio')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                placeholder="Enter your portfolio"
              />
              {errors.portfolio && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.portfolio.message}
                </motion.p>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between pt-6 "
              variants={itemVariants}
            >
              <motion.input
                type="submit"
                value={'save'}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              />
          </motion.div>
          </form>
          <div className="flex items-center justify-around mt-5 ">

          
          <motion.button
                type="button"
                onClick={() => navigate('/create_resume/')}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Previous
              </motion.button >

              <motion.button
                type="button"
                onClick={() => navigate(`/create_resume/?step=${Number(step)+1}&resumeId=${resumeId}`)}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >

              {isSubmitting ? 'Saving...' : ' Continue'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              </div>
        </motion.div>

        {/* Progress Indicator
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Step 2 of 4</p>
        </motion.div> */}

      </div>
    </motion.div>
  );
};

export default ResumePage2;