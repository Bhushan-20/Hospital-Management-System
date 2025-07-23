import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";
import OpenRoute from "./Components/Auth/OpenRoute";
import PrivateRoute from "./Components/Auth/PrivateRoute";

function App() {
  const jwt = useSelector((state) => state.jwt);
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isLoggedIn = jwt !== null;

  return (
    <div className="flex">
      {/* Show Sidebar only when logged in and not on auth pages */}
      {isLoggedIn && !isAuthPage && <Sidebar />}

      <div className="w-full">
        {/* Show Header only when logged in and not on auth pages */}
        {isLoggedIn && !isAuthPage && <Header />}

        <Routes>
          {/* Protected route using PrivateRoute */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Public routes using OpenRoute */}
          <Route
            path="/login"
            element={
              <OpenRoute>
                <LoginPage />
              </OpenRoute>
            }
          />
          <Route
            path="/register"
            element={
              <OpenRoute>
                <RegisterPage />
              </OpenRoute>
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
