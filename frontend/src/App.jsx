import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResumePage from "./pages/resumeFolder/ResumePage";
function App() {  

  
  return (
    <div className="w-full overflow-x-hidden bg-gray-100 h-screen "> 
      <Routes>
        <Route
          path="/home"
          element={
            <div className=" w-[90%]  mx-auto min-h-screen">
              <Navbar />
              <HomePage />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className=" w-[90%]  mx-auto min-h-screen">
              <Navbar />
              <ProfilePage />
            </div>
          }
        />
        <Route 
          path="/register" 
          element={<RegisterPage />} 
        />
        <Route 
          path="/" 
          element={<LoginPage />} 
        />

        <Route
        path="/create_resume"
        element={<ResumePage/>}
        />
       

      </Routes>
    </div>
  );
}

export default App;
