import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {PageChangeOnRoute} from "./animation/GSAP_effects/PageChangeAnimations";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <PageChangeOnRoute>
      <App />
    </PageChangeOnRoute>
     </BrowserRouter>
  </StrictMode>
);
