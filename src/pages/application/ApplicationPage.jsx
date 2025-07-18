import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import ApplicationForm from "../../components/application/ApplicationForm";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ApplicationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { policeId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const applicationData = {
      ...data,
      policeId,
      policeName: data.policeTitle,
      userEmail: user.email,
      userId: user.uid,
    };

    try {
      const response = await axiosSecure.post("/application", applicationData);

      if (response.status !== 201) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      toast.success("Application Submitted");
      setIsLoading(false);
      navigate("/all-policies");
      reset();
    } catch (err) {
      setIsLoading(false);
      console.log("Error from sending data to the server", err);
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 dark:text-white p-6 flex justify-center items-center mt-20 mb-20">
      <title>Apply form</title>
      <ApplicationForm
        policeId={policeId}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isSubmitLoading={isLoading}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
};

export default ApplicationPage;
