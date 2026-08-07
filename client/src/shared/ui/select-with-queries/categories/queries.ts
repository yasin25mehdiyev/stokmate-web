import { useGetCategories } from "@/shared/api/generated/lookups/lookups";
import { STALE_TIME_MS } from "@/shared/config/constants";

export const useCategories = () => {
  const { data, isPending, error } = useGetCategories({
    query: { staleTime: STALE_TIME_MS },
  });

  return { categories: data ?? [], isLoading: isPending, error };
};
