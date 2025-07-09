import React, { useState, useEffect, use } from "react";
import { FaEdit, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import useImageUpload from "../../hooks/useImageUpload";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthProvider";
import ProfileLoading from "../loading/ProfileLoading";

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user, setUser, updateUser, loading } = use(AuthContext);
  const { images, handleImageUpload, uploading } = useImageUpload();
  const axiosInstance = useAxios();
  // New displayName state for form input (only store input value, no sync needed)
  const [displayNameInput, setDisplayNameInput] = useState(
    user?.displayName || ""
  );

  // Update input value when edit mode toggles on or user changes
  useEffect(() => {
    if (isEditing) {
      setDisplayNameInput(user?.displayName || "");
    }
  }, [isEditing, user]);

  // loading
  if (loading) {
    return <ProfileLoading />;
  }

  // handle update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const newDisplayName = displayNameInput.trim();
    const newPhotoURL = images || user?.photoURL;

    if (newDisplayName === user.displayName && newPhotoURL === user.photoURL) {
      toast.info("No changes detected. Nothing to update.");
      setIsEditing(false);
      return;
    }

    setIsLoading(true);

    try {
      // send to db
      await axiosInstance.patch(`/update-profile/${user.uid}`, {
        userName: newDisplayName,
        userProfile: newPhotoURL,
      });

      // for firebase
      await updateUser({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      // local state
      setUser({
        ...user,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // handle cancel
  const handleCancelEdit = () => {
    setIsEditing(false);
    setDisplayNameInput(user?.displayName);
  };

  // date
  const formatDate = (timestamp) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex items-start justify-center">
      <div className="max-w-4xl w-full bg-white/80 dark:bg-gray-900 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform">
        <div className="relative md:w-full bg-gradient-to-br from-teal-300 to-teal-600 text-white p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 transform transition-transform duration-300 hover:scale-105">
              <img
                src={user.photoURL}
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
              <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600">
                <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white text-lg">
                  {user?.displayName || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600">
                <label className="block text-gray-600 dark:text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                  Email
                </label>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-md border border-blue-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaRegCalendarAlt className="text-blue-500 dark:text-blue-400" />
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Account Created
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-md border border-green-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3 mb-3">
                    <FaRegClock className="text-green-500 dark:text-green-400" />
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Last Login
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatDate(user?.metadata?.lastSignInTime)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={displayNameInput}
                  onChange={(e) => setDisplayNameInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Profile Picture
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="profileImg"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className={`w-full  border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-gray-700 dark:text-white transition-all duration-200 block  text-sm text-gray-500  file:mr-4 file:py-4 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-100 file:text-teal-700
                    hover:file:bg-teal-200
                    dark:file:bg-teal-700 dark:file:text-teal-300
                    dark:hover:file:bg-teal-600
                    cursor-pointer  
                    ${uploading ? "opacity-50 pointer-events-none" : ""}
                    `}
                  />
                  {uploading && (
                    <span className="absolute right-3 top-3 text-sm text-gray-500">
                      Uploading...
                    </span>
                  )}
                </div>
                {/* Show uploaded image preview or current photoURL */}
                {(images || user?.photoURL) && (
                  <img
                    src={images || user.photoURL}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover mt-4"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || uploading}
                className={`w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition duration-300 ${
                  uploading ? "cursor-not-allowed opacity-70" : ""
                } ${isLoading ? "opacity-70" : ""}`}
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

export default UpdateProfile;
