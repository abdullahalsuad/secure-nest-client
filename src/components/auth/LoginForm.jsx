import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
const LoginForm = ({
  handleSubmit,
  handleLogin,
  register,
  errors,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-5 " onSubmit={handleSubmit(handleLogin)}>
      {/* Email Input */}
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

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-10 pr-4  border border-gray-300 dark:border-gray-600 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg transition-colors px-4 py-3"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
          </button>
        </div>

        {errors.email?.type === "required" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Password is required
          </p>
        )}

        {errors.password?.type === "minLength" && (
          <p role="alert" className="text-center mt-2 text-red-400">
            Password must be 8 character longer
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center text-sm">
          <input
            type="checkbox"
            className="rounded text-teal-500 dark:bg-gray-700 focus:ring-teal-500"
          />
          <span className="ml-2">Remember me</span>
        </label>
        <a href="#" className="text-sm text-teal-500 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 mt-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800 cursor-pointer"
      >
        {isLoading ? "loading....." : " Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
