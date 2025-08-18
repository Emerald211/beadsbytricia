import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AdminDashboardProvider from "./utils/context/admin-state-context/AdminContext.tsx";
import StoreContextProvider from "./utils/context/store/StoreContext.tsx";
import UserProvider from "./utils/context/user/UserContext.tsx";
import ScrollToTop from "./pages/home/components/scrolltotop/ScrolltoTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminDashboardProvider>
        <UserProvider>
          <StoreContextProvider>
            <ScrollToTop />
            <App />
          </StoreContextProvider>
        </UserProvider>
      </AdminDashboardProvider>
    </BrowserRouter>
  </StrictMode>
);
