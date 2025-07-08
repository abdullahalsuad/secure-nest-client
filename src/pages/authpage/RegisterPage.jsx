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

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const axiosInstance = useAxios();
  const { createUser, setUser, updateUser } = use(AuthContext);

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

  const handleRegister = async (data) => {
    console.log(data);

    const email = data.email;
    const name = data.fullName;
    const password = data.password;

    // Sign Up
    try {
      const result = await createUser(email, password);

      //   const userInfo = {
      //     userName: name,
      //     userEmail: email,
      // firebase id
      //     userId: result.user.uid,
      //   };

      // update userinfo in the database

      //   const userRes = await axiosInstance.post("/add-users", userInfo);

      await updateUser({
        displayName: name,
      });

      setUser({ ...result.user, displayName: name });

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
      />

      {/* Divider */}
      <Divider />

      {/* Social Login Buttons */}
      <SocialLoginButtons />

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
