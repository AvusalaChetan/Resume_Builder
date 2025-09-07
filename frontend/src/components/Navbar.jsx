import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import HeadingTitle from "./HeadingTitle";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState({});
  const [isMenuShow, setIsMenuShow] = useState(false);
  const menuOpenRef = useRef(null);

  useEffect(() => {
    async function GetToken() {
      try {
        const res = await axios.get("/token");
        setIsLogin(res.data);
      } catch (error) {
        console.log(error.message, error.res);
        return error.res?.data;
      }
    }
    GetToken();
    return () => { };
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  useGSAP(() => {
    if (!isMenuShow) return;

    gsap.from(menuOpenRef.current, {
      y: -1000,
      yoyo: true,
      duration: 1,
    });

    gsap.delayedCall(0.1, () => {
      gsap.from('.menu-item', {
        y: -50,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.2
      })
    });
  }, [isMenuShow])

  return (
    <>
      <div className="relative">
        <div className="flex justify-between backdrop-blur-2xl p-4 w-full">
<HeadingTitle/>        
  <button
            className="mr-2 text-3xl md:text-4xl font-extrabold"
            onClick={() => {
              setIsMenuShow(true);
            }}
          >
            <CiMenuBurger />
          </button>
        </div>
        <div>
          {isMenuShow && (
            <div
              ref={menuOpenRef}
              className="menucontainer fixed inset-0 bg-white text-black z-50 flex flex-col"
            >
              <div className="h-full w-full flex flex-col">
                <div className="flex items-center justify-between w-[95%] mx-auto py-6">
                  <h2 className="text-2xl md:text-4xl tracking-widest loading-font font-bold ">Resume_Builder</h2>
                  <button
                    className="text-black text-[3rem] md:text-[4rem] hover:text-gray-400 transition"
                    onClick={() => {
                      setIsMenuShow(false);
                    }}
                  >
                    <IoMdClose /> {/*x*/}
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center flex-1 gap-3">
                  {[
                    { linkName: "home", to: "/home" },
                    { linkName: "profile", to: "/profile" },
                  ].map((item, idx) => (
                    <div className="overflow-hidden" key={idx}>
                      <Link
                        className="menu-item  text-2xl md:text-[4rem] capitalize font-bold hover:text-gray-400 transition w-full text-center"
                        to={item.to}
                      >
                        {item.linkName}
                      </Link>
                    </div>
                  ))}
                  <button
                    onClick={logout}
                    className="menu-item capitalize text-2xl md:text-[4rem] font-bold"
                  >
                    {isLogin.token ? "logout" : "login"}
                  </button>
                  <motion.button
                    initial={{ backgroundColor: "white", color: "black" }}
                    whileHover={{ backgroundColor: "black", color: "white" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="menu-item relative capitalize text-2xl md:text-[4rem] font-bold border border-black  py-1 rounded-2xl bg-black text-white md:bg-white md:text-black hover:cursor-pointer  overflow-hidden"
                    onClick={() => navigate("/create_resume")}
                  >
                    create resume
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div></>
  );
};

export default Navbar;
