import React, { useState, useRef, useEffect } from 'react';
import {
  TbSettings,
  TbMessageCircle,
  TbPhoto,
  TbSearch,
  TbArrowsLeftRight,
  TbTrash,
} from 'react-icons/tb';
import { FiChevronDown } from 'react-icons/fi';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-red-100 transition"
      >
        {/* Funny Avatar or Initial */}
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=bhushan"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-red-200 shadow-md"
        />
        <FiChevronDown className="text-red-600 text-lg" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-64 bg-white/80 backdrop-blur-md shadow-2xl border border-red-100 rounded-xl overflow-hidden z-20 animate-slide-fade"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-red-100 bg-white/60">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=bhushan"
              alt="avatar"
              className="w-12 h-12 rounded-full border border-red-200"
            />
            <div>
              <p className="font-semibold text-gray-800">Bhushan Patil</p>
              <p className="text-sm text-gray-500">Software Engineer</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

function Section({ title, children }) {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-500 font-medium px-3 py-1">{title}</p>
      <div>{children}</div>
    </div>
  );
}

function MenuItem({ icon, label, shortcut, color = 'black' }) {
  const baseColor =
    color === 'red'
      ? 'text-red-600 hover:bg-red-50'
      : 'text-gray-800 hover:bg-gray-50';

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-lg transition-all ${baseColor}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {shortcut && <span className="text-xs text-gray-400">{shortcut}</span>}
    </div>
  );
}

export default ProfileMenu;
