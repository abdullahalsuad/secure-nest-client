import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import useImageUpload from "../../../hooks/useImageUpload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import PoliciesForm from "./PoliciesForm";
import { AuthContext } from "../../../context/AuthProvider";

const AddPolicies = ({ setIsModalOpen, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Custom  hook
  const { images, handleImageUpload, uploading } = useImageUpload();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle submit
  const onSubmit = async (data) => {
    setIsLoading(true);

    const policeData = {
      ...data,
      policyImage: images,
      userId: user.uid,
      userEmail: user.email,
    };

    // send to backend
    try {
      const response = await axiosSecure.post("/add-police", policeData);

      if (!response.status === 201) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      toast.success("Police added successfully!");
      setIsLoading(false);
      setIsModalOpen(false);
      refetch();
      reset();
    } catch (err) {
      setIsLoading(false);
      console.log("Error from sending data to the server", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Add New Police
      </h2>
      <PoliciesForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isLoading={isLoading}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
      />
    </div>
  );
};

export default AddPolicies;
