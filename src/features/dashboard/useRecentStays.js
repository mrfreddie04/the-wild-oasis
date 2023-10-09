import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

const confirmedStatuses = ["checked-in", "checked-out"];

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last") || 7);
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter((stay) => confirmedStatuses.includes(stay.status));

  return { isLoading, stays, confirmedStays, error, numDays };
};
