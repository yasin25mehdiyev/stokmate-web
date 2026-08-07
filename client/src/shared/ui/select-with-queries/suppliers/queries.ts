import { useGetSuppliers } from "@/shared/api/generated/lookups/lookups";
import { STALE_TIME_MS } from "@/shared/config/constants";

export const useSuppliers = () => {
  const { data, isPending, error } = useGetSuppliers({
    query: { staleTime: STALE_TIME_MS },
  });

  return { suppliers: data ?? [], isLoading: isPending, error };
};
