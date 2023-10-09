import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export const useCheckin = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-in`);
      client.invalidateQueries({ active: true });
      // client.invalidateQueries({
      //   queryKey: ["booking",data.id],
      // });
      navigate("/"); //navigate to dashboard
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingIn, checkin };
};
