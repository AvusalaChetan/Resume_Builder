import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-100 h-screen "> 
      <Routes>
        <Route
          path="/"
          element={
            <div className=" w-[90%]  mx-auto min-h-screen">
              <Navbar />
              <HomePage />
            </div>
          }
        />
        <Route 
          path="/register" 
          element={<RegisterPage />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />

      </Routes>
    </div>
  );
}

export default App;
