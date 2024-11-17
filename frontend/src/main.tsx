import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/bootstrap.min.css"; // Bootstrap styles
import "./assets/css/font-awesome.min.css"; // Bootstrap styles
import "./assets/css/style.css"; // Custom template styles
import "./assets/css/slick.css";
import "./assets/css/slick-theme.css";
import "./assets/js/jquery.min.js";
import "./assets/js/bootstrap.min.js";
//import "./assets/js/slick.min.js";

import "./assets/js/jquery.zoom.min.js";
//import "./assets/js/main.js";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
