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
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import { jwtDecode } from "jwt-decode";
import PatientProfilePage from "./pages/Patient/PatientProfilePage";
import EditProfile from "./Components/Patient/SettingsEdit/EditProfile";
import DoctorProfile from "./Components/Doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./Components/Doctor/SettingsEdit/EditDoctorProfile";
import PatientAppointment from './pages/Patient/PatientAppointment';
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";

function App() {
  const jwt = useSelector((state) => state.jwt);
  let user = null;
  if(jwt){
    user = jwtDecode(jwt);
  }
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isLoggedIn = jwt !== null;

  return (
    <div className="flex">
      {/* Show Sidebar only when logged in and not on auth pages
      {isLoggedIn && !isAuthPage && <Sidebar />} */}

      <div className="w-full">
        {/* Show Header only when logged in and not on auth pages */}
        {/* {isLoggedIn && !isAuthPage && <Header />} */}

        <Routes>

        <Route
            path="*"
            element={<Navigate to={isLoggedIn ? `${user.role.toLowerCase()}/dashboard` : "/login"} />}
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

          {/* Protected route using PrivateRoute For Patients */}
          <Route path="/patient"
            element={
              <PrivateRoute>
                <PatientDashboard/>
              </PrivateRoute>
            }>
            <Route path="settings"
            element={
              <PrivateRoute>
                <EditProfile/>
              </PrivateRoute>
            }/>
              <Route path="dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="profile"
            element={
              <PrivateRoute>
                <PatientProfilePage/>
              </PrivateRoute>
            }/>
            <Route path="appointments"
            element={
              <PrivateRoute>
                <PatientAppointment/>
              </PrivateRoute>
            }/>
            <Route path="records"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="doctors"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="my-bills"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            </Route>


            {/* Protected route using PrivateRoute For Doctors */}
            <Route path="/doctor"
            element={
              <PrivateRoute>
                <DoctorDashboard/>
              </PrivateRoute>
            }>
            <Route path="settings"
            element={
              <PrivateRoute>
                <EditDoctorProfile/>
              </PrivateRoute>
            }/>
            <Route path="profile"
            element={
              <PrivateRoute>
                <DoctorProfile/>
              </PrivateRoute>
            }/>
              <Route path="dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="appointments"
            element={
              <PrivateRoute>
                <DoctorAppointment/>
              </PrivateRoute>
            }/>
            <Route path="records"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="patients"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            <Route path="prescriptions"
            element={
              <PrivateRoute>
                <AdminDashboard/>
              </PrivateRoute>
            }/>
            </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
