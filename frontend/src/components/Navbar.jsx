import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="">
        <nav className="p-2 flex items-center lg:justify-around sm:justify-between w-full mx-auto mt-4 py-2 bg-white shadow-2xl border border-gray-200 rounded-lg">
          <h1 className="capitalize lg:text-2xl md:text-xl sm:text-lg font-black ">
            resume_Builder
          </h1>
          <div className="flex gap-3.5 items-center justify-center">
           
            <Link
              to="/"
              className=" transition-colors"
            >
              dashboard
            </Link>
            <Link
              to="/templates"
              className=" transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/profile"
              className=" transition-colors"
            >
              Profile
            </Link>
            <Button
              type={"button"}
              value={"create resume"}
              clickAction={()=>  navigate("/create_resume")}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
