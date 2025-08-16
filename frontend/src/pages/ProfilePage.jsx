import axios from "axios";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      navigate('/login')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await axios.get("/api/profile");
        setUser(res.data.user);
      };
      getUser();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    console.log("res.data", user);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-black/90  to-black/45 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex items-center -mt-12">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-4 mt-12">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name || "User Name"}
                </h1>
                <p className="text-gray-600">
                  {user.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold capitalize">Identity/bio</h4>
            <button
              onClick={() => { setIsEditing(!isEditing) }}
              className="text-blue-600 font-semibold">{isEditing ? 'cancle' : 'edit'}</button>
          </div>
          <div className="px-2 pt-4">
            {isEditing ? <><form action="">
              <label htmlFor="">date of birth</label>
              <input type="text" />
            </form></> : <>show bio </>}
          </div>
        </div>
        <div
          className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resume Statistics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Total Resumes</span>
              <span className="font-semibold text-blue-600">
                {user.resume?.length || 0 }
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Last Updated</span>
              <span className="font-semibold text-purple-600">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="border absolute bottom-5 w-[80%] mx-auto bg-red-100 rounded-xl shadow-lg p-6 ">
          <button
            onClick={logout}
            className=" text-red-600 font-bold text-xl flex items-center justify-start gap-2">
            logout{" "}
            <span className="font-bold">
              <LuLogOut className="font-bold" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
