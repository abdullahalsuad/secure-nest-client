import axios from "axios";
import { AuthContext } from "../context/AuthProvider.jsx";

// import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000/api/v1" : "",
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        // navigate("/forbidden");
      } else if (status === 401) {
        // signOutUser()
        //   .then(() => {
        //     navigate("/login");
        //   })
        //   .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
