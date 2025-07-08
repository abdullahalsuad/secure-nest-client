import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";
import Divider from "../../components/auth/Divider";
import CustomLinks from "../../components/auth/CustomLinks";
import FormHeading from "../../components/auth/FormHeading";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  const { logIn } = use(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // login
  const handleLogin = async (data) => {
    const email = data.email;
    const password = data.password;

    // Sign in
    try {
      await logIn(email, password);
      reset();
      toast.success("Login successful. Welcome back!");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      // Map Firebase error codes to user-friendly messages
      console.log(error);
      const errorMessages = {
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/user-not-found": "No account found with this email.",
        "auth/invalid-credential":
          "Incorrect password or Email. Please try again.",
        default: "An unexpected error occurred. Please try again.",
      };
      const message = errorMessages[error.code] || errorMessages.default;

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800  rounded-xl shadow-lg p-8  bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Form heading */}
      <FormHeading title="Sign In" />

      {/* form */}
      <LoginForm
        handleLogin={handleLogin}
        isLoading={isLoading}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />

      {/* Divider */}
      <Divider />

      {/* Social Login Buttons */}
      <SocialLoginButtons />

      {/* Sign Up Link */}

      <CustomLinks
        des=" Don't have an account ? "
        url="/authpage/register"
        title="Sign up"
      />
    </div>
  );
};

export default LoginPage;
