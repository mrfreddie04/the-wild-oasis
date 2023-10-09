import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("User successfully logged out");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      //console.error("ERROR", err);
      toast.error("Logout error");
    },
  });

  return { isLoading, logout };
};
