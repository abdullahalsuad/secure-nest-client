import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { use } from "react";
import { AuthContext } from "../context/AuthProvider";

const useUserRole = () => {
  const { user, loading: authLoading } = use(AuthContext);

  const axiosSecure = useAxiosSecure();

  const {
    data: userRole = "Customer",
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.uid}`);
      return res.data.userRole;
    },
  });

  return { userRole, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
