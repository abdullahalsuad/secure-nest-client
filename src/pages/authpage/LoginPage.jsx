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
import useAxios from "../../hooks/useAxios";

const LoginPage = () => {
  const { logIn, signInWithGoogle } = use(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

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

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      toast.success("Login successful. Welcome back!");

      const userInfo = {
        userName: result.user.displayName,
        userEmail: result.user.email,
        userProfile: result.user.photoURL,
        //firebase id
        userId: result.user.uid,
      };

      try {
        await axiosInstance.post("/add-user", userInfo);
      } catch (err) {
        if (err.response?.status !== 409) {
          throw err;
        }
      }

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      // Map Firebase error codes to friendly messages
      const errorMessages = {
        "auth/popup-closed-by-user": "Popup closed. Please try again.",
        "auth/cancelled-popup-request":
          "Another popup was opened. Please try again.",
        "auth/invalid-credential": "Failed to authenticate with Google.",
        "auth/internal-error": "An internal error occurred. Try again later.",
        default: "Something went wrong. Please try again.",
      };

      const errorMessage = errorMessages[error.code] || errorMessages.default;
      toast.error(errorMessage);
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
      <SocialLoginButtons handleGoogleSignIn={handleGoogleSignIn} />

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
