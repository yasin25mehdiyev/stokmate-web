import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelect } from "@/shared/ui/custom/form";
import { useCategories } from "./queries";

interface CategoriesSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name?: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
  value?: string | number;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  allLabel?: string;
  disabled?: boolean;
  className?: string;
}

const CategoriesSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  value,
  onValueChange,
  label,
  placeholder,
  allLabel,
  disabled,
  className,
}: CategoriesSelectProps<TFieldValues>) => {
  const { t } = useTranslation();
  const { categories, isLoading } = useCategories();

  const options = [
    ...(allLabel ? [{ value: "all", label: allLabel }] : []),
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name ?? "",
    })),
  ];

  return (
    <FormSelect
      name={name}
      control={control}
      value={value}
      onValueChange={onValueChange}
      label={label}
      placeholder={
        isLoading
          ? t("select.loading")
          : (placeholder ?? t("select.categoryPlaceholder"))
      }
      options={options}
      valueAsNumber
      disabled={disabled || isLoading}
      className={className}
    />
  );
};

export { CategoriesSelect };
