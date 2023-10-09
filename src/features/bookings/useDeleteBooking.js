import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const client = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully deleted`);
      //toast.success(`Booking successfully deleted`);
      client.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting: isLoading, deleteBooking: mutate };
};
