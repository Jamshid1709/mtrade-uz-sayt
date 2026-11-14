import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "@phosphor-icons/react";
import App from "./App";
import "./index.css";

// MTrade Academy — Brand v2.1 (p.19): ikonkalar duotone og'irlikda
const iconContext = { weight: "duotone" as const };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconContext.Provider value={iconContext}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IconContext.Provider>
  </StrictMode>
);
