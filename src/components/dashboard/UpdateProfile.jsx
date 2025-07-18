import React, { useState, useEffect, use } from "react";
import { FaEdit, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import useImageUpload from "../../hooks/useImageUpload";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthProvider";
import ProfileLoading from "../loading/ProfileLoading";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user, setUser, updateUser, loading } = use(AuthContext);
  const { images, handleImageUpload, uploading } = useImageUpload();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [displayNameInput, setDisplayNameInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [specialtiesInput, setSpecialtiesInput] = useState("");

  // Fetch agent data
  const { data: agentData, isLoading: agentLoading } = useQuery({
    queryKey: ["agentData", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/${user.uid}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  // Pre-fill fields when entering edit mode
  useEffect(() => {
    if (isEditing && agentData) {
      setDisplayNameInput(agentData?.userName || "");
      setExperienceInput(agentData?.experience || "");
      setSpecialtiesInput(agentData?.specialties || "");
    }
  }, [isEditing, agentData]);

  // Mutation to update agent profile
  const mutation = useMutation({
    mutationFn: async (updateData) => {
      return await axiosInstance.patch(
        `/update-agent-profile/${user.uid}`,
        updateData,
        { withCredentials: true }
      );
    },
    onSuccess: async () => {
      // Update Firebase display name + photo
      await updateUser({
        displayName: displayNameInput,
        photoURL: images || user?.photoURL,
      });

      setUser({
        ...user,
        displayName: displayNameInput,
        photoURL: images || user?.photoURL,
      });

      queryClient.invalidateQueries(["agentData"]);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);

    mutation.mutate({
      userName: displayNameInput,
      userProfile: images || user?.photoURL,
      experience: experienceInput,
      specialties: specialtiesInput,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDisplayNameInput(agentData?.userName);
    setExperienceInput(agentData?.experience);
    setSpecialtiesInput(agentData?.specialties);
  };

  const formatDate = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  if (loading || agentLoading) {
    return <ProfileLoading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex items-start justify-center">
      <title>Profile</title>
      <div className="max-w-4xl w-full bg-white/80 dark:bg-gray-900 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform">
        <div className="relative md:w-full bg-gradient-to-br from-teal-300 to-teal-600 text-white p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 transform transition-transform duration-300 hover:scale-105">
              <img
                src={images || user.photoURL}
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </div>
            <h2 className="text-2xl font-extrabold mb-2 tracking-tight">
              {user.displayName}
            </h2>
            <p className="text-lg opacity-90 font-light flex items-center gap-2">
              <MdOutlineEmail className="text-xl" /> {user.email}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isEditing ? "Edit Profile" : "Profile Details"}
            </h3>
            <button
              onClick={() =>
                isEditing ? handleCancelEdit() : setIsEditing(true)
              }
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              aria-label={isEditing ? "Close edit form" : "Edit profile"}
            >
              {isEditing ? (
                <>
                  <IoMdClose size={20} /> <span>Cancel</span>
                </>
              ) : (
                <>
                  <FaEdit size={18} /> <span>Edit</span>
                </>
              )}
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              <InfoBlock label="Full Name" value={agentData?.userName} />
              <InfoBlock label="Email" value={agentData?.userEmail} />
              {(agentData.userRole === "Agent" ||
                agentData.userRole === "Admin") && (
                <>
                  <InfoBlock label="Experience" value={agentData?.experience} />
                  <InfoBlock
                    label="Specialties"
                    value={agentData?.specialties}
                  />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <InfoCard
                  icon={
                    <FaRegCalendarAlt className="text-blue-500 dark:text-blue-400" />
                  }
                  title="Account Created"
                  value={formatDate(user?.metadata?.creationTime)}
                  color="blue"
                />
                <InfoCard
                  icon={
                    <FaRegClock className="text-green-500 dark:text-green-400" />
                  }
                  title="Last Login"
                  value={formatDate(user?.metadata?.lastSignInTime)}
                  color="green"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <TextInput
                label="Full Name"
                value={displayNameInput}
                onChange={(e) => setDisplayNameInput(e.target.value)}
              />
              {(agentData?.userRole === "Agent" ||
                agentData?.userRole === "Admin") && (
                <>
                  <TextInput
                    label="Experience"
                    value={experienceInput}
                    onChange={(e) => setExperienceInput(e.target.value)}
                  />
                  <TextInput
                    label="Specialties"
                    value={specialtiesInput}
                    onChange={(e) => setSpecialtiesInput(e.target.value)}
                  />
                </>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className={`w-full border file:mr-4 file:py-4 file:px-4 rounded-md transition-all duration-200 ${
                    uploading ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
                {(images || user?.photoURL) && (
                  <img
                    src={images || user.photoURL}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover mt-4"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || uploading}
                className={`w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition duration-300 ${
                  isLoading || uploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const TextInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
    />
  </div>
);

const InfoBlock = ({ label, value }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-600">
    <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2 text-sm uppercase">
      {label}
    </label>
    <p className="text-gray-900 dark:text-white text-lg">{value || "N/A"}</p>
  </div>
);

const InfoCard = ({ icon, title, value, color }) => (
  <div className={`bg-${color}-50 dark:bg-gray-800 p-5 rounded-xl border`}>
    <div className="flex items-center space-x-3 mb-3">
      {icon}
      <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
    </div>
    <p className="text-gray-700 dark:text-gray-300">{value}</p>
  </div>
);

export default UpdateProfile;
