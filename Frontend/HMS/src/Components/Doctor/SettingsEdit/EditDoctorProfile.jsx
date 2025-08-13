import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { FiUser, FiMail, FiSave, FiX } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { updateDoctor  } from '../../../services/operations/doctorProfileAPI';
import { setDoctor } from "../../../slice/doctorSlice";
import { toast } from 'react-hot-toast';



const specializationOptions = {
  Cardiology: ["Interventional Cardiologist", "Heart Failure Specialist", "Non-Invasive Cardiology", "Electrophysiologist", "Pediatric Cardiologist"],
  Pediatrics: ["Neonatologist (Newborn care)", "Pediatric Cardiologist", "Pediatric Neurologist", "Pediatric Endocrinologist"],
  Orthopedics: ["Joint Replacement Surgeon", "Sports Medicine Specialist", "Spine Surgeon", "Pediatric Orthopedist"],
  Dermatology: ["Cosmetic Dermatologist", "Dermatopathologist", "Pediatric Dermatologist", "Trichologist (Hair & scalp specialist)"],
  "Gynecology & Obstetrics": ["Obstetrician (Pregnancy & Delivery)", "Gynecologic Oncologist", "Reproductive Endocrinologist","Urogynecologist "],
  Ophthalmology: ["Cornea Specialist", "Retina Specialist", "Glaucoma Specialist"],
  Dentistry: ["Orthodontist", "Prosthodontist", "Endodontist", "Periodontist"],
  Psychiatry: ["Child & Adolescent Psychiatrist", "Addiction Psychiatrist", "Forensic Psychiatrist", "Geriatric Psychiatrist"]
};




const EditDoctorProfile = () => {
  const doctor = useSelector((state) => state.doctor.doctor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
    watch
  } = useForm();

  
  useEffect(() => {
    

    if (doctor) {
      setValue("name", doctor.name || "");
      setValue("email", doctor.email || "");
      setValue("birthDate", doctor.birthDate?.split("T")[0] || "");
      setValue("phoneNumber", doctor.phoneNumber || "");
      setValue("department", doctor.department || "");
      setValue("specialization", doctor.specialization || "");
      setValue("aadharNumber", doctor.aadharNumber || "");
      setValue("gender", doctor.gender || "");
      setValue("licenseNumber", doctor.licenseNumber || "");
      setValue("experience", doctor.experience || "");
      setValue("address", doctor.address || "");
    }
  }, [doctor, setValue]);


  const submitProfileForm = async (formData) => {
    try {
      const { name, email, ...otherData } = formData;
      const finalData = {
        ...otherData,
      };

      const updatedDoctor = await updateDoctor({...doctor, ...finalData});
      dispatch(setDoctor(updatedDoctor));
      toast.success("Doctor profile updated successfully!");
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error("Failed to update doctor profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg border border-red-200 shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-100 p-6 sm:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <RiEdit2Fill className="mr-2" />
            Edit Profile
          </h1>
          <p className="text-white mt-2">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitProfileForm)} className="p-6 sm:p-8">
          {/* Profile Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-red-200 flex items-center">
                          <FiUser className="mr-2" />
                          Personal Details
                        </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-richblack-200">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    readOnly
                    className={`w-full bg-richblack-50 font-semibold border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all`}
                    placeholder="John Doe"
                    {...register("name", {})}
                  />
                  <FiUser className="absolute left-3 top-3.5 text-richblack-400" />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-richblack-200">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    readOnly
                    className={`w-full bg-richblack-50 font-semibold border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all`}
                    placeholder="john@example.com"
                    {...register("email", {})}
                  />
                  <FiMail className="absolute left-3 top-3.5 text-richblack-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Birth Date */}
                <div className="space-y-2">
                  <label htmlFor="birthDate" className="block text-sm font-medium text-richblack-200">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("birthDate", { required: "Birth date is required" })}
                  />
                  {errors.birthDate && <p className="text-sm text-red-400">{errors.birthDate.message}</p>}
                </div>

                {/* Phone Field with Country Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-richblack-200">
                    Phone
                  </label>
                  <PhoneInput
                    country={'in'}
                    enableSearch={true}
                    value={watch("phoneNumber")}
                   onChange={(value) => setValue("phoneNumber", value, { shouldDirty: true })}
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                    }}
                    inputClass="!w-full text-lg bg-white !border !border-black rounded-lg px-6 py-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    buttonClass="!bg-white"
                    containerClass="!w-full"
                  />
                  {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>}
                </div>


                {/* Department */}
                  <div className="space-y-2">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      id="department"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                      {...register("department", { required: "Department is required" })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        -- Select Department --
                      </option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="Dentistry">Dentistry</option>
                      <option value="Psychiatry">Psychiatry</option>
                    </select>
                    {errors.department && (
                      <p className="text-sm text-red-500">{errors.department.message}</p>
                    )}
                  </div>

                  {/* Specialization Dropdown (updates based on department) */}
                <div className="space-y-2">
                  <label htmlFor="specialization" className="block text-sm font-medium text-richblack-200">
                    Specialization
                  </label>
                  <select
                    id="specialization"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("specialization", { required: "Specialization is required" })}
                    defaultValue=""
                  >
                    <option value="" disabled>-- Select Specialization --</option>
                    {(specializationOptions[watch("department")] || []).map((spec, idx) => (
                      <option key={idx} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-sm text-red-400">{errors.specialization.message}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-richblack-200">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("gender", { required: "Gender is required" })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-sm text-red-400">{errors.gender.message}</p>}
                </div>

                



                {/* licenseNumber */}
                <div className="space-y-2">
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-richblack-200">
                    License Number
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    placeholder="DOC-987654"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("licenseNumber", { required: "Aadhar Number is required" })}
                  />
                  {errors.licenseNumber && <p className="text-sm text-red-400">{errors.licenseNumber.message}</p>}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-richblack-200">
                    Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    placeholder="Example: 8 years"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    min="1"
                    max="50"
                    {...register("experience", {
                      required: "Experience is required",
                      valueAsNumber: true,
                      validate: value => value >= 0 || "Experience must be a non-negative number"
                    })}
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                    }}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-400">{errors.experience.message}</p>
                  )}
                </div>


                {/* Address */}
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-richblack-200">
                    Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="123 Medical St, Health City"
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && <p className="text-sm text-red-400">{errors.address.message}</p>}
                </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-richblack-700">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-profile")}
              className="flex items-center justify-center px-6 py-3 rounded-lg bg-richblack-700 hover:bg-richblack-600 text-richblack-50 font-medium transition-all hover:shadow-lg"
            >
              <FiX className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty}
              className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${isDirty ? 'bg-gradient-to-br from-red-600 to-red-100  text-white ' : 'bg-richblack-600 text-richblack-300 cursor-not-allowed'}`}
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDoctorProfile;