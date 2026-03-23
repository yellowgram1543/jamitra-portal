import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { LanguageProvider } from "./context/LanguageContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </UserProvider>
  </React.StrictMode>
);
