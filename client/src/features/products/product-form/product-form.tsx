import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";

import { Button } from "@/shared/ui/core/button";
import {
  Form,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/shared/ui/custom/form";
import { CategoriesSelect } from "@/shared/ui/select-with-queries/categories";
import { BrandsSelect } from "@/shared/ui/select-with-queries/brands";
import { SuppliersSelect } from "@/shared/ui/select-with-queries/suppliers";
import { ProductStatus, ProductUnit, type Product } from "@/entities/products";
import {
  createProductSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "./schema";
import { useCreateProduct } from "./lib/use-create-product";
import { useUpdateProduct } from "./lib/use-update-product";
import { useProductFormOptions } from "./lib/use-product-form-options";

interface ProductFormProps {
  product?: Product;
}

const getFormValues = (product?: Product): ProductFormInput => {
  return {
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    barcode: product?.barcode ?? "",
    categoryId: product?.categoryId,
    brandId: product?.brandId,
    supplierId: product?.supplierId,
    price: product?.price ? product.price / 100 : "",
    costPrice: product?.costPrice ? product.costPrice / 100 : "",
    stock: product?.stock ?? "",
    minStock: product?.minStock ?? "",
    unit: product?.unit ?? ProductUnit.NUMBER_1,
    status: product?.status ?? ProductStatus.NUMBER_1,
    description: product?.description ?? "",
  };
};

const ProductForm = ({ product }: ProductFormProps) => {
  const { t } = useTranslation("products");
  const router = useRouter();

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(createProductSchema(t)),
    defaultValues: getFormValues(product),
  });

  useEffect(() => {
    form.reset(getFormValues(product));
  }, [product]);

  const { unitOptions, statusOptions } = useProductFormOptions();
  const { createProduct, isPending: isCreating } = useCreateProduct();
  const { updateProduct, isPending: isUpdating } = useUpdateProduct();
  const isPending = isCreating || isUpdating;

  const onSubmit = (values: ProductFormValues) => {
    if (product?.id) {
      updateProduct(product.id, values);
    } else {
      createProduct(values);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <FormInput
              name="name"
              label={t("form.name")}
              placeholder={t("form.namePlaceholder")}
            />
            <FormInput
              name="sku"
              label={t("form.sku")}
              placeholder={t("form.skuPlaceholder")}
            />
            <FormInput
              name="barcode"
              label={t("form.barcode")}
              placeholder={t("form.barcodePlaceholder")}
            />

            <CategoriesSelect name="categoryId" label={t("form.category")} />
            <BrandsSelect name="brandId" label={t("form.brand")} />
            <SuppliersSelect name="supplierId" label={t("form.supplier")} />

            <FormInput
              name="price"
              type="number"
              step="0.01"
              min="0"
              label={t("form.price")}
              placeholder={t("form.pricePlaceholder")}
            />
            <FormInput
              name="costPrice"
              type="number"
              step="0.01"
              min="0"
              label={t("form.costPrice")}
              placeholder={t("form.costPricePlaceholder")}
            />

            <FormInput
              name="stock"
              type="number"
              min="0"
              label={t("form.stock")}
              placeholder="0"
            />
            <FormInput
              name="minStock"
              type="number"
              min="0"
              label={t("form.minStock")}
              placeholder="0"
            />

            <FormSelect
              name="unit"
              label={t("form.unit")}
              options={unitOptions}
              valueAsNumber
            />
            <FormSelect
              name="status"
              label={t("form.status")}
              options={statusOptions}
              valueAsNumber
            />
          </div>

          <FormTextarea
            name="description"
            label={t("form.description")}
            placeholder={t("form.descriptionPlaceholder")}
            maxLength={500}
          />

          <div className="flex justify-end gap-3 border-t border-wash pt-6">
            <Button
              type="button"
              variant="outline"
              color="brand"
              onClick={() => router.history.back()}
            >
              {t("form.cancel")}
            </Button>
            <Button type="submit" loading={isPending} disabled={isPending}>
              {product ? t("form.update") : t("form.create")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { ProductForm };
