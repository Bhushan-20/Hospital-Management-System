import React, { useState, useRef, useEffect } from 'react';
import {
  TbSettings,
  TbMessageCircle,
  TbPhoto,
  TbSearch,
  TbArrowsLeftRight,
  TbTrash,
  TbLogout,
} from 'react-icons/tb';
import { FiChevronDown } from 'react-icons/fi';
import Patient from "../../assets/icons/patient.png";
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from "../../redux/slices/userSlice"; // Adjust the path
import DoctorAvatar from "../../assets/doctor.jpg";
import AdminAvatar from "../../assets/admin.png";
import { removeToken } from '../../slice/authSlice';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(removeToken());
    setOpen(false);
  };

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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:shadow transition"
      >
        <img
          src={getAvatarUrlByRole(user?.role)}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-richblack-200 shadow-md"
        />
        <FiChevronDown className="text-red-600 text-lg" />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white/80 backdrop-blur-md shadow-xl border border-red-100 rounded-xl z-50 animate-slide-fade">
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-red-100 bg-white/70">
            <img
              src={getAvatarUrlByRole(user?.role)}
              alt="avatar"
              className="w-12 h-12 rounded-full border border-red-200"
            />
            <div>
              <p className="font-semibold text-gray-800 text-base">{user?.name}</p>
              <p className="text-xs text-white bg-red-500 px-2 py-1 rounded-full w-fit mt-1">
                {user?.role}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-1 py-2">
            <Section title="Application">
              <MenuItem icon={<TbSettings size={18} />} label="Settings" />
              <MenuItem icon={<TbMessageCircle size={18} />} label="Messages" />
              <MenuItem icon={<TbPhoto size={18} />} label="Gallery" />
              <MenuItem icon={<TbSearch size={18} />} label="Search" shortcut="⌘K" />
            </Section>

            <div className="border-t my-1 border-red-100" />

            <Section title="Danger zone">
              <MenuItem icon={<TbArrowsLeftRight size={18} />} label="Transfer my data" />
              <MenuItem icon={<TbTrash size={18} />} label="Delete my account" color="red" />
            </Section>

            <div className="border-t my-1 border-red-100" />

            <Section title="">
              <MenuItem icon={<TbLogout size={18} />} label="Logout" onClick={handleLogout} color="red" />
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

function Section({ title, children }) {
  return (
    <div className="mb-2">
      {title && <p className="text-xs text-gray-500 font-medium px-3 py-1">{title}</p>}
      <div>{children}</div>
    </div>
  );
}

function MenuItem({ icon, label, shortcut, onClick, color = 'black' }) {
  const baseColor =
    color === 'red'
      ? 'text-red-600 hover:bg-red-50'
      : 'text-gray-800 hover:bg-gray-100';

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-lg transition-all ${baseColor}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {shortcut && <span className="text-xs text-gray-400">{shortcut}</span>}
    </div>
  );
}

export default ProfileMenu;
