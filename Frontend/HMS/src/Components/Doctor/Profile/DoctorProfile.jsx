import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoctorAvatar from "../../../assets/doctor.jpg";
import { FiUser, FiMail, FiCalendar, FiPhone, FiMapPin, FiActivity } from 'react-icons/fi';
import { FaUserMd } from 'react-icons/fa';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import Edit from '../../../assets/icons/edit.png';
import Loader from '../../../Components/Loader'
import gender from '../../../assets/icons/gender.png'
import { fetchDoctor } from "../../../slice/doctorSlice";


const DoctorProfile = () => {
    const user = useSelector((state) => state.user.user);
    const { doctor, loading } = useSelector((state) => state.doctor);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
    if (user?.profileId && !doctor) {
        dispatch(fetchDoctor(user.profileId));
        
    }
    }, [user]);

  

    const getAvatarUrlByRole = () => {
        return DoctorAvatar;
    };

    if (!doctor) {
        return <div className="text-center py-10"> <Loader/></div>;
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
                        <div className="flex flex-col justify-end md:flex-row items-center gap-6">
                            <div className="relative">
                                <img
                                    src={getAvatarUrlByRole()}
                                    alt="avatar"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30 shadow-lg hover:scale-105 transition duration-300"
                                />
                            </div>
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
                        {/* Personal Information */}
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
                                        <p className="font-medium">{doctor.birthDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FiPhone className="text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{doctor.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FiMapPin className="text-gray-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{doctor.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="space-y-4 mt-5">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                        <img
                                            src={gender}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{doctor.gender}</p>
                                    </div>
                                </div>



                                {/* New Doctor Fields */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-green-100 text-green-600 flex-shrink-0">
                                        <FaUserMd />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Department</p>
                                        <p className="font-medium">{doctor.department}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 flex-shrink-0">
                                        <FiUser />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Specialization</p>
                                        <p className="font-medium">{doctor.specialization}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-pink-100 text-pink-600 flex-shrink-0">
                                        <FiUser />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">License Number</p>
                                        <p className="font-medium">{doctor.licenseNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                                        <FiCalendar />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Experience</p>
                                        <p className="font-medium">{doctor.experience} years</p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-10">
                                    <div className="flex items-center gap-3"></div>
                                    <IconBtn
                                        text="Edit"
                                        onclick={() => {
                                            navigate("/doctor/settings");
                                        }}
                                    >
                                        <img
                                            src={Edit}
                                            alt="edit"
                                            className="w-4 h-4"
                                        />
                                    </IconBtn>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
