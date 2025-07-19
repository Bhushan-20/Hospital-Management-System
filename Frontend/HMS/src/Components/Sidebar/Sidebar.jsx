import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import Logo from '../../assets/Logo1.png';
import Appointment from "../../assets/icons/medical-appointment.png";
import Dashboard from "../../assets/icons/dashboard.png";
import Doctor from "../../assets/icons/doctor.png";
import Patient from "../../assets/icons/patient.png";
import Pharmacy from "../../assets/icons/pharmacy.png";

const links = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <img src={Dashboard} alt="Dashboard" className="w-6 h-6" />,
  },
  {
    name: "Doctors",
    url: "/doctors",
    icon: <img src={Doctor} alt="Doctors" className="w-6 h-6" />,
  },
  {
    name: "Patients",
    url: "/patients",
    icon: <img src={Patient} alt="Patients" className="w-6 h-6" />,
  },
  {
    name: "Appointments",
    url: "/appointments",
    icon: <img src={Appointment} alt="Appointments" className="w-6 h-6" />,
  },
  {
    name: "Pharmacy",
    url: "/pharmacy",
    icon: <img src={Pharmacy} alt="Pharmacy" className="w-6 h-6" />,
  },
];

const Sidebar = () => {
  const location = useLocation();


  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-red-50 to-white shadow-2xl border-r border-red-100 backdrop-blur-lg px-6 py-8 flex flex-col items-center">
      
      {/* Logo */}
      <div className="-mt-14">
        <img src={Logo} alt="Logo" className="w-40 h-40 object-contain drop-shadow-xl" />
      </div>

      {/* Avatar */}
      {/* Avatar (Funny or Stylish) */}
      <div className="flex flex-col items-center mb-10">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=bhushan"
          alt="avatar"
          className="w-16 h-16 rounded-full shadow-xl hover:scale-105 transition duration-300"
        />
        <p className="text-xl font-bold text-gray-800 mt-2 tracking-wide">Bhushan</p>
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

      {/* Footer or Logout Option */}
      <div className="mt-auto w-full text-center text-xs text-gray-400 pt-6 border-t border-red-100">
        <p>Made with ❤️ by Bhushan</p>
      </div>
    </div>
  );
};

export default Sidebar;
