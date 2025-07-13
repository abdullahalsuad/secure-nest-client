import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplicationForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  policeId,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: police,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["police", policeId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/polices/${policeId}`);
      return res.data;
    },
    enabled: !!policeId,
  });

  if (isLoading)
    return <div className="text-center text-white p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500 p-4">Error fetching data</div>
    );

  const durations =
    police?.durationOptions?.split(/,\s*/).filter(Boolean) || [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-md shadow-xl border border-gray-300"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Application Form</h2>

      {/* Police Details */}
      <div className="mb-6 ">
        <h3 className="text-xl font-semibold mb-4">Selected Policy</h3>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow border-dashed border-teal-900 border-2">
          <p className="font-semibold text-lg">{police.title}</p>
          <p className="text-sm mt-1">{police.category}</p>
          <img
            src={police.policeImage}
            alt={police.title}
            className="w-full h-48 object-cover rounded-md mt-4  "
          />

          <div className="mt-4">
            <label className="block mb-2 font-medium">Select Duration:</label>
            <div className="flex flex-wrap gap-4">
              {durations.map((d, idx) => (
                <label key={idx} className="flex items-center gap-2 ">
                  <input
                    type="radio"
                    value={d}
                    className="accent-teal-600"
                    {...register("duration", { required: true })}
                  />
                  {d}
                </label>
              ))}
            </div>
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                Please select a duration
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Full Name *</label>
            <input
              {...register("fullName", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Email *</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Address *</label>
            <input
              {...register("address", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.address && (
              <p className="text-red-500 text-sm">Address is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">NID Number *</label>
            <input
              {...register("nid", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">NID is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Number</label>
            <input
              type="tel"
              {...register("applicantNumber")}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.nid && (
              <p className="text-red-500 text-sm">Number is required</p>
            )}
          </div>
        </div>
      </div>

      {/* Nominee Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Nominee Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Nominee Name *</label>
            <input
              {...register("nomineeName", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.nomineeName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Relationship *</label>
            <input
              {...register("relationship", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.relationship && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Nominee Mobile Number *</label>
            <input
              type="tel"
              {...register("nomineeNumber", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.nomineeNumber && (
              <p className="text-red-500 text-sm">Mobile number is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Nominee Address *</label>
            <input
              {...register("nomineeAddress", { required: true })}
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
            />
            {errors.nomineeAddress && (
              <p className="text-red-500 text-sm">Address is required</p>
            )}
          </div>
        </div>
      </div>

      {/* Health Disclosure */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Health Disclosure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              className="accent-teal-600"
              type="checkbox"
              {...register("healthIssues.diabetes")}
            />{" "}
            Diabetes
          </label>
          <label className="flex items-center gap-2">
            <input
              className="accent-teal-600"
              type="checkbox"
              {...register("healthIssues.heart")}
            />{" "}
            Heart Disease
          </label>
          <label className="flex items-center gap-2">
            <input
              className="accent-teal-600"
              type="checkbox"
              {...register("healthIssues.asthma")}
            />{" "}
            Asthma
          </label>
          <label className="flex items-center gap-2">
            <input
              className="accent-teal-600"
              type="checkbox"
              {...register("healthIssues.none")}
            />{" "}
            None
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white py-3 rounded-md-lg font-semibold transition duration-200 rounded-md cursor-pointer"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
