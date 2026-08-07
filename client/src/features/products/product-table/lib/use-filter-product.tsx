import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { Button } from "@/shared/ui/core/button";
import { CategoriesSelect } from "@/shared/ui/select-with-queries/categories";
import { BrandsSelect } from "@/shared/ui/select-with-queries/brands";

interface UseFilterProductProps {
  onChange?: () => void;
}

const useFilterProduct = ({ onChange }: UseFilterProductProps = {}) => {
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [brandId, setBrandId] = useState<number | undefined>();

  const hasActiveFilters = !!categoryId || !!brandId;

  const clearFilters = () => {
    setCategoryId(undefined);
    setBrandId(undefined);
    onChange?.();
  };

  const filters = (
    <>
      <CategoriesSelect
        value={categoryId}
        onValueChange={(value) => {
          setCategoryId(value === "all" ? undefined : Number(value));
          onChange?.();
        }}
        allLabel={t("dataTable.allCategories")}
        placeholder={t("dataTable.allCategories")}
        className="w-44 bg-white"
      />

      <BrandsSelect
        value={brandId}
        onValueChange={(value) => {
          setBrandId(value === "all" ? undefined : Number(value));
          onChange?.();
        }}
        allLabel={t("dataTable.allBrands")}
        placeholder={t("dataTable.allBrands")}
        className="w-44 bg-white"
      />

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          size={36}
          onClick={clearFilters}
          className="text-ink-secondary"
        >
          <X />
          {t("dataTable.clearFilters")}
        </Button>
      )}
    </>
  );

  return { categoryId, brandId, hasActiveFilters, filters };
};

export { useFilterProduct };
