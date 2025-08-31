import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from 'axios'
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res.data)
      setIsLogin(false)
      navigate('/login')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }


  return (
    <div className="">
      <nav className="p-2 flex items-center lg:justify-around sm:justify-between w-full mx-auto mt-4 py-2 bg-white shadow-2xl border border-gray-200 rounded-lg">
        <h1 className="capitalize lg:text-2xl md:text-xl sm:text-lg font-black ">
          resume_Builder
        </h1>
        <div className="flex gap-3.5 items-center justify-center">
          {[{ name: 'home', to: '/home' }, { name: 'profile', to: '/profile' }].map((item, index) => {
            return (
              <Link
                key={index}
                to={item.to}
                className=" transition-colors font-semibold capitalize"
              >
                {item.name}
              </Link>
            )
          })}

          <button onClick={logout} className="font-semibold capitalize">{isLogin ? 'logout' : 'login'}</button>     
          
          <Button
            value={"create resume"}
            onClick={() => navigate("/create_resume")}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
