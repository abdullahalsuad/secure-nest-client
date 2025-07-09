import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthProvider";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";
import Divider from "../../components/auth/Divider";
import RegisterForm from "../../components/auth/RegisterForm";
import CustomLinks from "../../components/auth/CustomLinks";
import FormHeading from "../../components/auth/FormHeading";
import useImageUpload from "../../hooks/useImageUpload";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const { createUser, setUser, updateUser, signInWithGoogle } =
    use(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Use the image upload hook
  const { images, handleImageUpload, uploading } = useImageUpload();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegister = async (data) => {
    const email = data.email;
    const name = data.fullName;
    const password = data.password;

    const profileImg = images;

    // Sign Up
    try {
      // creating user on firebase
      const result = await createUser(email, password);

      await updateUser({
        displayName: name,
        photoURL: profileImg,
      });

      const userInfo = {
        userName: name,
        userEmail: email,
        userProfile: profileImg,
        //firebase id
        userId: result.user.uid,
      };

      //   update userinfo in the database
      await axiosInstance.post("/add-user", userInfo);

      setUser({ ...result.user, displayName: name, photoURL: profileImg });

      toast.success("Account Create successful");
      reset();
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      // Firebase Auth error codes for sign up
      const errorMessages = {
        "auth/email-already-in-use": "This email is already in use.",
        "auth/invalid-email": "The email address is invalid.",
        "auth/operation-not-allowed":
          "Email/password accounts are not enabled.",
        "auth/weak-password":
          "Password is too weak. Use at least 6 characters.",
        "auth/missing-password": "Please enter a password.",
        "auth/missing-email": "Please enter an email address.",
        default: "An unexpected error occurred. Please try again.",
      };

      const message = errorMessages[error.code] || errorMessages.default;
      toast.error(message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();

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

      toast.success("Login successful. Welcome back!");
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
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      {/* Form heading */}
      <FormHeading title="Create Account" />

      {/* Register Form */}
      <RegisterForm
        handleRegister={handleRegister}
        isLoading={isLoading}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
      />

      {/* Divider */}
      <Divider />

      {/* Social Login Buttons */}
      <SocialLoginButtons handleGoogleSignIn={handleGoogleSignIn} />

      {/* Sign Up Link */}
      <CustomLinks
        des="Already have an account ? "
        url="/authpage"
        title="Login"
      />
    </div>
  );
};

export default RegisterPage;
