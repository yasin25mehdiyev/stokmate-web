import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { handleApiError } from "@/shared/lib";
import { useConfirmDialog } from "@/shared/hooks/use-confirm-dialog";
import { useDeleteProductsId } from "@/shared/api/generated/products/products";
import {
  useProductsInvalidateQueries,
  type Product,
} from "@/entities/products";

const useDeleteProduct = () => {
  const { t } = useTranslation("products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const invalidateProducts = useProductsInvalidateQueries();

  const { mutate: deleteProduct } = useDeleteProductsId({
    mutation: {
      onSuccess: () => {
        invalidateProducts();
        if (selectedProduct) {
          toast.success(t("delete.success", { name: selectedProduct.name }));
        }
      },
      onError: (error) => handleApiError(error),
    },
  });

  const { openConfirm, dialogProps } = useConfirmDialog({
    onConfirm: () => {
      if (!selectedProduct?.id) return;
      deleteProduct({ id: selectedProduct.id });
    },
  });

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    openConfirm({
      title: t("delete.title"),
      description: t("delete.description", { name: product.name }),
      confirmLabel: t("delete.confirm"),
    });
  };

  return { handleDelete, confirmDialogProps: dialogProps };
};

export { useDeleteProduct };
