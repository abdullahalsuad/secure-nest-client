import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import ApplicationForm from "../../components/application/ApplicationForm";

const ApplicationPage = () => {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { policeId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen  text-gray-900 dark:text-white p-6 flex justify-center items-center mt-20 mb-20">
      <ApplicationForm
        policeId={policeId}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
};

export default ApplicationPage;
