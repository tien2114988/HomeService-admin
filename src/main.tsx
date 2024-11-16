import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import axios from "axios";
import AppRoutes from "@/app/routes/AppRoutes";
import { setupAxios } from "@/app/modules/auth/core/AuthHelper";
import { AuthProvider } from "./app/modules/auth/core/Auth";
import i18n from "@/app/i18n";
import { I18nextProvider } from "react-i18next";

setupAxios(axios);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>
);
