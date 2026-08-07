import { useQueryClient } from "@tanstack/react-query";

import {
  useGetProducts as useGetProductsApi,
  useGetProductsId,
  useGetProductsStats,
  getGetProductsQueryKey,
  getGetProductsIdQueryKey,
} from "@/shared/api/generated/products/products";
import { PRODUCTS_LIST_REFETCH_INTERVAL_MS } from "@/shared/config/constants";
import type { ProductListParams } from "./types";

export const useProducts = (params: ProductListParams) => {
  const { data, isPending, error } = useGetProductsApi(
    {
      Q: params.q,
      CategoryId: params.categoryId,
      BrandId: params.brandId,
      Status: params.status,
      Page: params.page,
      PageSize: params.pageSize,
      Sort: params.sort,
      Dir: params.dir,
    },
    { query: { refetchInterval: PRODUCTS_LIST_REFETCH_INTERVAL_MS } },
  );

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading: isPending,
    error,
  };
};

export const useProduct = (id: number) => {
  const { data, isPending, error } = useGetProductsId(id, {
    query: { enabled: !!id, retry: false },
  });

  return { product: data, isLoading: isPending, error };
};

export const useProductsStats = () => {
  const { data, isPending } = useGetProductsStats();

  return {
    total: data?.total ?? 0,
    lowStock: data?.lowStock ?? 0,
    outOfStock: data?.outOfStock ?? 0,
    isLoading: isPending,
  };
};

export const useProductsInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return (id?: number) => {
    queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });

    if (id) {
      queryClient.invalidateQueries({ queryKey: getGetProductsIdQueryKey(id) });
    }
  };
};
