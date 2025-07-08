import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaImage,
} from "react-icons/fa";

const RegisterForm = ({
  handleRegister,
  handleSubmit,
  register,
  errors,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            {...register("fullName", { required: true })}
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 pl-10 pr-4  border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors"
          />
        </div>

        {errors.fullName?.type === "required" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Full name is required
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 pr-4  border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors px-4 py-3"
          />
        </div>

        {errors.email?.type === "required" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Email is required
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: /(?=.*[a-z])(?=.*[A-Z])/,
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="w-full pl-10 pr-10  border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors px-4 py-3"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4" />
            ) : (
              <FaEye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password?.type === "required" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Password is required
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Password must be at least 8 characters long
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Must contain at least one uppercase and one lowercase letter
          </p>
        )}
      </div>

      {/* Profile Picture URL */}
      <div className="space-y-2">
        <label
          htmlFor="photoURL"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Profile Picture URL (optional)
        </label>
        <div className="relative">
          <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            {...register("photoURL")}
            id="photoURL"
            type="url"
            placeholder="https://example.com/profile.jpg "
            className="w-full pl-10 pr-4  border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors px-4 py-3"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 mt-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800 cursor-pointer"
      >
        {isLoading ? "loading....." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;
