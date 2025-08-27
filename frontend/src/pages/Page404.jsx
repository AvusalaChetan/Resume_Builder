import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-9xl font-bold text-red-500"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl font-semibold text-gray-800 mt-4"
      >
        Oops! Page Not Found
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-gray-500 mt-2"
      >
        The page you are looking for does not exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <Link
          to="/home"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-2xl shadow-md hover:bg-blue-600 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Page404;
