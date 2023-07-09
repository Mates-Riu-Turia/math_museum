import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./i18n";

import { loginAnonymous, app } from "./db";
import App from "./App";

const root = createRoot(document.getElementById("root"));

if (!app.currentUser) {
  const anonUser = await loginAnonymous();
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);