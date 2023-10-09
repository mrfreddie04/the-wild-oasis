import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("User successfully logged in");
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });
      //navigate("/dashboard", { replace: true });
    },
    onError: () => {
      //console.error("ERROR", err);
      toast.error("Invalid credentials");
    },
  });

  return { isLoading, login };
};
