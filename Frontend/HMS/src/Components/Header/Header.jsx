import React from 'react';
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { MdNotificationsActive } from "react-icons/md";
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const isLoggedIn = false;
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-3 bg-white/80 backdrop-blur-md shadow-md border-b border-red-100 flex justify-between items-center">
      
      {/* Left Side: Sidebar toggle + Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle sidebar"
          className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-100 transition-all duration-300 group"
        >
          <TbLayoutSidebarLeftCollapse className="text-3xl text-red-600 group-hover:scale-110 transition-transform" />
        </button>

        {/* Breadcrumb placeholder */}
        <div className="text-sm text-gray-600 font-medium hidden md:block">
          Dashboard / Overview
        </div>
      </div>

      {/* Right Side: Search + Notifications + Profile */}
      <div className="flex items-center gap-6">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center rounded-xl overflow-hidden border border-red-100 shadow-sm bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 w-64 text-sm outline-none text-gray-700 bg-transparent"
          />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-100 transition-all duration-300 group"
        >
          <MdNotificationsActive className="text-2xl text-red-600 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full shadow-md animate-pulse"></span>
        </button>
        {/* Profile OR Login Button */}
        {isLoggedIn ? (
          <ProfileMenu />
        ) : (
          <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition shadow-md">
            Login
          </button>
        )}

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
