import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Logo from '../../../assets/Logo1.png';
import Appointment from "../../../assets/icons/medical-appointment.png";
import Dashboard from "../../../assets/icons/dashboard.png";
import Doctor from "../../../assets/icons/doctor.png";
import Patient from "../../../assets/icons/patient.png";
import Pharmacy from "../../../assets/icons/pharmacy.png";
import { useSelector } from 'react-redux';
import PatientAvatar from "../../../assets/patient.jpg";
import DoctorAvatar from "../../../assets/doctor.jpg";
import AdminAvatar from "../../../assets/admin.png";
import Prescriptions from "../../../assets/icons/prescription.png";
import Records from "../../../assets/icons/health-report.png";
import Profile from "../../../assets/icons/user.png";



const links = [
  {
    name: "Dashboard",
    url: "/doctor/dashboard",
    icon: <img src={Dashboard} alt="Dashboard" className="w-6 h-6" />,
  },
  {
    name: "Profile",
    url: "/doctor/profile",
    icon: <img src={Profile} alt="Profile" className="w-6 h-6" />,
  },
  {
    name: "Patients",
    url: "/doctor/patients",
    icon: <img src={Patient} alt="Patients" className="w-6 h-6" />,
  },
  {
    name: "Appointments",
    url: "/doctor/appointments",
    icon: <img src={Appointment} alt="Appointments" className="w-6 h-6" />,
  },
  {
    name: "Records",
    url: "/doctor/records",
    icon: <img src={Records} alt="Records" className="w-6 h-6" />,
  },
  {
    name: "Prescription",
    url: "/doctor/prescriptions",
    icon: <img src={Prescriptions} alt="Prescriptions" className="w-6 h-6" />,
  },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);


const getAvatarUrlByRole = (role) => {

  switch (role) {
    case "ADMIN":
      return AdminAvatar;
    case "DOCTOR":
     return DoctorAvatar;
    case "PATIENT":
      return Patient;
    default:
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=default`;
  }
};



  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-red-50 to-white shadow-2xl border-r border-red-100 backdrop-blur-lg px-6 py-8 flex flex-col items-center">
      
      {/* Logo */}
      <div className="-mt-14">
        <img src={Logo} alt="Logo" className="w-40 h-40 object-contain drop-shadow-xl" />
      </div>

      {/* Avatar */}
      {/* Avatar (Funny or Stylish) */}
      <div className="flex flex-col items-center mb-6 -mt-6">
        <img
          src={getAvatarUrlByRole(user.role)}
          alt="avatar"
          className="w-24 h-24 rounded-full shadow-xl hover:scale-105 transition duration-300"
        />
        <p className="text-xl font-bold text-gray-800 mt-2 tracking-wide">{user.name}</p>
        <p className="font-semibold text-gray-800">{user.role}</p>
      </div>


      {/* Nav Links */}
            <nav className="flex flex-col gap-3 w-full">
              {links.map((link) => {
                const isActive = location.pathname === link.url;
                return (
                  <NavLink
                    key={link.name}
                    to={link.url}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl text-md font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-red-100 ${
                      isActive ? "bg-red-200 text-red-800 font-semibold shadow-md" : "text-gray-700"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 bg-red-600 rounded-full shadow-sm animate-ping" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
    </div>
  );
};

export default DoctorSidebar;
