import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:3000/api/v1"
    : "https://secure-nest-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
