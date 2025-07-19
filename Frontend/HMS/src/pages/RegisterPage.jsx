import React, { useState } from 'react';
import { FaHeartbeat, FaUserAlt } from 'react-icons/fa';
import { FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const roles = [
  { label: 'Patient', value: 'PATIENT' },
  { label: 'Doctor', value: 'DOCTOR' },
  { label: 'Admin', value: 'ADMIN' },
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT', 
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (roleValue) => {
  setFormData({ ...formData, role: roleValue });
};


  const validate = () => {
    const newErrors = {};
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format.';

    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Enter valid 10-digit number.';

    if (!password) {
    newErrors.password = 'Password is required.';
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    }
  }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registering with data:', formData);
      // Call backend here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-300 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-2xl z-0 animate-pulse" />

      <div className="relative z-10 max-w-4xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-red-100">
        
        {/* Left Pane */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-red-400 to-pink-500 text-white w-1/2 p-10">
          <FaHeartbeat className="text-5xl mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-2 text-center">Join Pulse HMS</h2>
          <p className="text-sm text-center">
            Create an account to manage healthcare efficiently.
          </p>
        </div>

        {/* Right Pane - Register Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Create an Account</h3>

          {/* Role Slider */}
          <div className="flex justify-center mb-6">
            {roles.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handleRoleChange(value)}
                className={`px-4 py-2 mx-1 rounded-full text-sm font-semibold border transition ${
                  formData.role === value
                    ? 'bg-red-500 text-white'
                    : 'bg-white border-red-300 text-gray-600 hover:bg-red-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>


          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <FaUserAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-red-400 text-sm`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-red-400 text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div className="relative">
              <FiPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border ${
                  errors.mobile ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-red-400 text-sm`}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</p>}
            </div>

            {/* Password */}
            <div className="mb-1">
                <div className="relative h-12">
                  <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white border ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:border-red-400 text-sm h-full`}
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
                )}
              </div>


            {/* Confirm Password */}
            <div className="mb-1">
              <div className="relative h-12">
                <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:border-red-400 text-sm h-full`}
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>


            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition shadow-md"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <span className="text-red-500 hover:underline cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
