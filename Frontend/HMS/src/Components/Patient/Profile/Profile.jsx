import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Patient from "../../../assets/icons/patient.png";
import DoctorAvatar from "../../../assets/doctor.jpg";
import AdminAvatar from "../../../assets/admin.png";
import { FiUser, FiMail, FiCalendar, FiPhone, FiMapPin, FiActivity } from 'react-icons/fi';
import { FaUserShield, FaUserMd, FaUserInjured } from 'react-icons/fa';
import Allergies from '../../../assets/icons/antihistamines.png'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import Edit from '../../../assets/icons/edit.png';
import { getPatient  } from '../../../services/operations/patientProfileAPI';
import Loader from '../../../Components/Loader';
import gender from '../../../assets/icons/gender.png'
import { fetchPatient } from '../../../slice/patientSlice';


const bloodGroupMap = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-'
};




const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const { patient, loading } = useSelector((state) => state.patient);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.profileId && !patient) {
            dispatch(fetchPatient(user.profileId));
        }
    }, [user]);

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

    // ✅ Handle loading state safely
    if (!patient) {
        return (
        <div className="text-center py-10 text-gray-500">
            <Loader/>
        </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    {/* Profile Header with Gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
                        <div className="flex flex-col justify-end md:flex-row items-center gap-6">
                            {/* Avatar with Pulse Animation */}
                            <div className="relative">
                                <img
                                    src={getAvatarUrlByRole(user.role)}
                                    alt="avatar"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30 shadow-lg hover:scale-105 transition duration-300"
                                />
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <FiMail className="text-blue-200" />
                                    <p className="text-lg text-yellow-100">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    {/* Profile Details */}
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <FiUser className="text-blue-600" />
                                Personal Information
                            </h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Birth Date</p>
                                        <p className="font-medium">{patient.birthDate}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <FiPhone className="text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{patient.phoneNumber}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <FiMapPin className="text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{patient.address}</p>
                                    </div>
                                </div>

                                    {user.role === 'PATIENT' && patient.bloodGroup && (
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-500 flex-shrink-0">🩸</div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Blood Group : {bloodGroupMap[patient.bloodGroup] || patient.bloodGroup}</p>
                                                
                                            </div>
                                        </div>

                                    )}

                            </div>
                        </div>
                        
                        {/* Account Information Section */}
                        <div className="space-y-4 mt-5">
                            {/* <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <FiActivity className="text-indigo-600" />
                                Account Information
                            </h2> */}
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                        <img
                                            src={gender}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{patient.gender}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
                                        <FiUser />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Aadhar Number</p>
                                        <p className="font-medium">{patient.aadharNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
                                        <img
                                        src={Allergies}
                                        alt="Allergies Icon"
                                        className="w-8 h-8 rounded-full shadow-xl hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Allergies</p>
                                        <div className="flex flex-wrap gap-2">
                                        {patient.allergies && patient.allergies.length > 0 ? (
                                            patient.allergies.map((item, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full border border-purple-300"
                                            >
                                                {item}
                                            </span>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">No allergies specified</p>
                                        )}
                                        </div>
                                    </div>
                                </div>

                                

                                <div className="flex justify-between mt-10">
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-500 flex-shrink-0"></div>
                                            <div>
                                                
                                            </div>
                                        </div>
                                    <IconBtn
                                        text="Edit"
                                        onclick={() => {
                                            navigate("/patient/settings")
                                        }}
                                    >
                                        <img
                                            src={Edit}
                                            alt="avatar"
                                            className="w-4 h-4"
                                        />
                                    </IconBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Cards - Only show for doctors and admins */}
                    {(user.role === 'DOCTOR' || user.role === 'ADMIN') && (
                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <p className="text-sm text-blue-600 mb-1">Appointments</p>
                                    <p className="text-2xl font-bold text-blue-800">142</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <p className="text-sm text-green-600 mb-1">Patients</p>
                                    <p className="text-2xl font-bold text-green-800">87</p>
                                </div>
                                {user.role === 'ADMIN' && (
                                    <>
                                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                            <p className="text-sm text-purple-600 mb-1">Staff</p>
                                            <p className="text-2xl font-bold text-purple-800">24</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                            <p className="text-sm text-amber-600 mb-1">Rooms</p>
                                            <p className="text-2xl font-bold text-amber-800">15</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;