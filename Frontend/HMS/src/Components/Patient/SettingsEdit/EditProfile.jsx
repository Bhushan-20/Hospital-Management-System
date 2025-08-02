import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { FiUser, FiMail, FiSave, FiX } from "react-icons/fi";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { updatePatient  } from '../../../services/operations/patientProfileAPI';
import { toast } from 'react-hot-toast';
import { setPatient } from '../../../slice/patientSlice';





const EditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const patient = useSelector((state) => state.patient.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allergies, setAllergies] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(",", "");
      if (!allergies.includes(newTag)) {
        const updated = [...allergies, newTag];
        setAllergies(updated);
        setValue("allergies", updated); // store in form
      }
      setInputValue("");
    }
  };

  const removeAllergy = (index) => {
    const updated = allergies.filter((_, i) => i !== index);
    setAllergies(updated);
    setValue("allergies", updated);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
    watch
  } = useForm();

  console.log(user);

  useEffect(() => {
      try {

        if(patient){
          setValue("name", patient.name || "");
          setValue("email", patient.email || "");
          setValue("birthDate", patient.birthDate?.split("T")[0] || "");
          setValue("phoneNumber", patient.phoneNumber || "");
          setValue("bloodGroup", patient.bloodGroup || "");
          setValue("allergies", patient.allergies || []);
          setAllergies(patient.allergies || []);
          setValue("aadharNumber", patient.aadharNumber || "");
          setValue("gender", patient.gender || "");
          setValue("address", patient.address || "");
        }
      } catch (error) {
        toast.error("Failed to fetch doctor data:", error);
      }
  }, [patient, setValue]);

  const submitProfileForm = async (formData) => {
    try {
      const { name, email, ...otherData } = formData;
      const finalData = {
        ...otherData,
      };

      const updatedPatient = await updatePatient({...patient, ...finalData});
      dispatch(setPatient(updatedPatient));
      
      toast.success("Patient profile updated successfully!");
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error("Failed to update doctor profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  }

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
                    className={`w-full bg-richblack-50 border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all`}
                    placeholder="John Doe"
                    {...register("name", { 
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
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
                    className={`w-full bg-richblack-50 border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all`}
                    placeholder="john@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
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


                {/* Blood Group (only for patients) */}
                {user?.role === 'PATIENT' && (
                  <div className="space-y-2">
                    <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                      {...register("bloodGroup", { required: "Blood Group is required" })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        -- Select Blood Group --
                      </option>
                      <option value="A_POSITIVE">A+</option>
                      <option value="A_NEGATIVE">A-</option>
                      <option value="B_POSITIVE">B+</option>
                      <option value="B_NEGATIVE">B-</option>
                      <option value="AB_POSITIVE">AB+</option>
                      <option value="AB_NEGATIVE">AB-</option>
                      <option value="O_POSITIVE">O+</option>
                      <option value="O_NEGATIVE">O-</option>
                    </select>
                    {errors.bloodGroup && (
                      <p className="text-sm text-red-500">{errors.bloodGroup.message}</p>
                    )}
                  </div>
                )}

                {/* Aadhar Number */}
                <div className="space-y-2">
                  <label htmlFor="aadharNumber" className="block text-sm font-medium text-richblack-200">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    id="aadharNumber"
                    placeholder="8459 5846 7452 5563"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                    {...register("aadharNumber", { required: "Aadhar Number is required" })}
                  />
                  {errors.aadharNumber && <p className="text-sm text-red-400">{errors.aadharNumber.message}</p>}
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

                {/* Allergies */}
                <div className="space-y-2">
                  <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                    Allergies <span className="text-xs text-gray-500">(press Enter or comma to add)</span>
                  </label>

                  <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg p-2 bg-white">
                    {allergies.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-richblack-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => removeAllergy(index)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    ))}

                    <input
                      type="text"
                      value={inputValue}
                      placeholder="e.g. Dust, Pollen"
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-grow focus:outline-none px-2 py-1 text-gray-800"
                    />
                  </div>

                  {/* register hidden input for react-hook-form */}
                  <input type="hidden" {...register("allergies", { required: "Please enter at least one allergy" })} />

                  {errors.allergies && (
                    <p className="text-sm text-red-500">{errors.allergies.message}</p>
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

export default EditProfile;