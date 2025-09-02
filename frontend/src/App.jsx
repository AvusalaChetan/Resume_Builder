import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResumePage from "./pages/resumeFolder/ResumePage";
import Page404 from "./pages/Page404";
import IntoPage from "./pages/IntoPage";
import { LoadingPage } from "./components/Loding";
import { useState, useEffect } from "react";
import PageChange from "./animation/GSAP_effects/PageChangeAnimations";

function App() {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 7200);
  }, []);

  return (
    <div className="w-full bg-gray-100 overflow-x-hidden">
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route
          path="/"
          element={
            <div>
              {isLoading ? (
                <LoadingPage />
              ) : (
                <>
                  <PageChange>
                    <IntoPage />
                  </PageChange>
                </>
              )}
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <div className="w-[90%] mx-auto min-h-screen">
              <Navbar />
              <HomePage />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="w-[90%] mx-auto min-h-screen">
              <Navbar />
              <ProfilePage />
            </div>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/create_resume"
          element={
            <>
              <Navbar />
              <ResumePage />
            </>
          }
        />
      </Routes>
     
    </div>
  );
}

export default App;
