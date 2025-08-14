import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="w-full overflow-x-hidden"> 
      <Routes>
        <Route
          path="/"
          element={
            <div>
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
