import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000/api/v1"
    : "https://secure-nest-client.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
