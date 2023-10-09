//import { useNavigate } from "react-router-dom";
import { useMutation /*, useQueryClient*/ } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export const useSignup = () => {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { isLoading, mutate: signup } = useMutation({
    mutationFn: (data) => signupApi(data),
    onSuccess: () => {
      //console.log(data);
      toast.success(
        "Account successfully created. Please verify the new account from the user's email address!"
      );
      //queryClient.setQueryData(["user"], data.user);
      //navigate("/", { replace: true });
      //navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      //console.error("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, signup };
};
