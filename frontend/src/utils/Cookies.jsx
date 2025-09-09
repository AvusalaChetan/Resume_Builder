import { useState,useEffect } from "react";
import axios from "axios";

const Cookies = () => {
  const [Token, setToken] = useState({});

  useEffect(() => {
    async function GetToken() {
      try {
        const res = await axios.get("/token");
        setToken(res.data);
      } catch (error) {
        console.log(error.message, error.res);
        return error.res?.data;
      }
    }
    GetToken();
  }, []);
  if (!Token.token) {
    return (
      <>
  <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white rounded-2xl shadow-lg max-w-md mx-auto mt-20 text-center">
  <div className="space-y-2">
    <h2 className="text-2xl font-semibold text-gray-800">
      Session Expired
    </h2>
    <p className="text-gray-600 text-sm">
      Your cookies have expired for security reasons. Please log in again to
      continue using <span className="font-medium text-blue-600">Resume Builder</span>.
    </p>
  </div>

  <button
    onClick={() => (window.location.href = "/login")}
    className="flex items-center justify-center gap-2 w-full px-6 py-3 
               bg-blue-600 text-white font-medium rounded-lg 
               shadow-md transition-all duration-200 
               hover:bg-blue-700 hover:shadow-lg active:scale-95"
  >
    <i className="fas fa-sign-in-alt"></i>
    Go to Login
  </button>
</div>

      </>
    );
  }
  return <div></div>;
};

export default Cookies;
