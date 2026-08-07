import { useTranslation } from "react-i18next";

import { ProductStatus, ProductUnit } from "@/entities/products";

const useProductFormOptions = () => {
  const { t } = useTranslation("products");

  const unitOptions = [
    { value: String(ProductUnit.NUMBER_1), label: t("unit.piece") },
    { value: String(ProductUnit.NUMBER_2), label: t("unit.kg") },
    { value: String(ProductUnit.NUMBER_3), label: t("unit.liter") },
    { value: String(ProductUnit.NUMBER_4), label: t("unit.box") },
  ];

  const statusOptions = [
    { value: String(ProductStatus.NUMBER_1), label: t("status.active") },
    { value: String(ProductStatus.NUMBER_2), label: t("status.inactive") },
    { value: String(ProductStatus.NUMBER_3), label: t("status.discontinued") },
  ];

  return { unitOptions, statusOptions };
};

export { useProductFormOptions };
