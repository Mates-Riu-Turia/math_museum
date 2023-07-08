import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./i18n";

import { loginAnonymous } from "./db";
import App from "./App";

// Log as anon-user in MongoDB Atlas
loginAnonymous();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);