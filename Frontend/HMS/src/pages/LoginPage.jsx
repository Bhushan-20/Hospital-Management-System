import React, { useState } from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { FiLock, FiMail } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid. Proceed to login...');
      // Submit login logic here
    }
  };

  const handleGuestLogin = () => {
    // simulate guest login
    console.log('Continuing as guest...');
    // navigate to dashboard or main app
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-300 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-2xl z-0 animate-pulse" />

      <div className="relative z-10 max-w-4xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-red-100">
        
        {/* Left Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-red-400 to-pink-500 text-white w-1/2 p-10">
          <FaHeartbeat className="text-5xl mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-2 text-center">Welcome to Pulse HMS</h2>
          <p className="text-sm text-center">
            Manage doctors, patients, pharmacy and appointments with care and precision.
          </p>

          <div className="mt-24 text-center">
            <button
                onClick={handleGuestLogin}
                    className="text-lg font-medium text-white hover: border border-transparent hover:border-white px-4 py-2 rounded transition duration-200"
            >
                Continue as Guest
            </button>
          </div>
        </div>

        

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Sign In to Your Account</h3>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-red-400 text-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white border ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-red-400 text-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition shadow-md"
            >
              Login
            </button>

            <p className="text-xs text-right text-gray-500 hover:text-red-500 cursor-pointer transition">
              Forgot Password?
            </p>
          </form>

          <div className="my-6 flex items-center gap-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <span className="text-red-500 hover:underline cursor-pointer">Sign Up</span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
