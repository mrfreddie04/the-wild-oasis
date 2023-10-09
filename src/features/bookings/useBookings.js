import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const client = useQueryClient();

  //Filters
  const filters = [];
  const filterValue = searchParams.get("status");
  if (filterValue && filterValue !== "all") filters.push({ field: "status", value: filterValue });
  //!filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

  //Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = Number(searchParams.get("page") || 1);

  //Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  //Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    client.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    client.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, count, error };
};
