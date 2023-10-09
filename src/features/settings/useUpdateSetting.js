import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useUpdateSettings = () => {
  const client = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: (settings) => updateSetting(settings),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      client.invalidateQueries({
        queryKey: ["settings"],
      });
      //reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
};
