import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const showLayout = !isLoginPage && !isRegisterPage;

  return (
    <div className="flex">
      {showLayout && <Sidebar />}
      <div className="w-full">
        {showLayout && <Header />}

        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
