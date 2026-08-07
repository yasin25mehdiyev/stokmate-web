import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";

import { handleApiError, smoothLoading } from "@/shared/lib";
import { MIN_LOADING_DURATION_MS } from "@/shared/config/constants";
import { usePostProducts } from "@/shared/api/generated/products/products";
import {
  useProductsInvalidateQueries,
  ProductStatus,
  ProductUnit,
} from "@/entities/products";
import type { ProductFormValues } from "../schema";

const useCreateProduct = () => {
  const { t } = useTranslation("products");
  const router = useRouter();
  const invalidateProducts = useProductsInvalidateQueries();
  const [isPending, setIsPending] = useState<boolean>(false);

  const { mutateAsync } = usePostProducts();

  const createProduct = async (values: ProductFormValues) => {
    setIsPending(true);
    try {
      const product = await smoothLoading(
        mutateAsync({
          data: {
            name: values.name,
            sku: values.sku,
            barcode: values.barcode || undefined,
            categoryId: values.categoryId,
            brandId: values.brandId,
            supplierId: values.supplierId || undefined,
            price: Math.round(values.price * 100),
            costPrice: values.costPrice
              ? Math.round(values.costPrice * 100)
              : undefined,
            stock: values.stock,
            minStock: values.minStock,
            unit: values.unit as ProductUnit,
            status: values.status as ProductStatus,
            description: values.description || undefined,
          },
        }),
        MIN_LOADING_DURATION_MS,
      );

      invalidateProducts();
      toast.success(t("form.createSuccess", { name: product.name }));
      router.navigate({ to: "/products" });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsPending(false);
    }
  };

  return { createProduct, isPending };
};

export { useCreateProduct };
