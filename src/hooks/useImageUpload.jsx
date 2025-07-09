import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useImageUpload = () => {
  const [images, setImages] = useState();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    try {
      // Reset error and start uploading
      setError(null);
      setUploading(true);

      // Get the selected file
      const image = e.target.files[0];
      if (!image) {
        throw new Error("No image selected.");
      }

      // Create FormData
      const formData = new FormData();
      formData.append("image", image);

      // Upload URL
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_UPLOAD_KEY
      }`;

      // Make the API request
      const response = await axios.post(uploadUrl, formData);

      // Update the specific image URL in state
      setImages(response.data.data.url);

      // Log success
      toast.success("Image uploaded successfully");
    } catch (err) {
      // Handle errors
      setError(err.message || "Failed to upload image.");
      console.error("Image upload failed:", err);
    } finally {
      // Stop uploading
      setUploading(false);
    }
  };

  return {
    images,
    handleImageUpload,
    uploading,
    error,
  };
};

export default useImageUpload;
