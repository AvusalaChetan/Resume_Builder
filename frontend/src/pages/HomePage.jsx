import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const [user, setUser] = useState(null);
  const [Token, setToken] = useState({});
  const [recentResumes, setRecentResumes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setRecentResumes([
      { id: 1, name: "Software Developer Resume", updatedAt: "2 days ago" },
      { id: 2, name: "Marketing Resume", updatedAt: "1 week ago" },
      { id: 3, name: "Designer Resume", updatedAt: "2 weeks ago" },
    ]);
  }, []);

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-red-200 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            cookies Expired
          </h2>
          <p className="text-gray-700 mb-6">
            You are not authenticated or your cookies has expired.
            <br />
            Please <span className="font-semibold text-blue-600">
              log in
            </span>{" "}
            again for security reasons.
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || "User"}!
            </h2>
            <p className="text-gray-600 mt-1">
              Ready to create your next professional resume? Let’s make it stand
              out!
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/create_resume")}
                className="p-5 bg-blue-50 border-2 border-transparent hover:border-blue-500 rounded-xl text-center transition"
              >
                <h4 className="font-medium text-gray-800">Create New Resume</h4>
                <p className="text-sm text-gray-600">Start from scratch</p>
              </button>
              <button className="p-5 bg-green-50 border-2 border-transparent hover:border-green-500 rounded-xl text-center transition">
                <h4 className="font-medium text-gray-800">Use Template</h4>
                <p className="text-sm text-gray-600">Choose from templates</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
