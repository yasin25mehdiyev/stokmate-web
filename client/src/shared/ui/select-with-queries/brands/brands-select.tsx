import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelect } from "@/shared/ui/custom/form";
import { useBrands } from "./queries";

interface BrandsSelectProps<TFieldValues extends FieldValues = FieldValues> {
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

const BrandsSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  value,
  onValueChange,
  label,
  placeholder,
  allLabel,
  disabled,
  className,
}: BrandsSelectProps<TFieldValues>) => {
  const { t } = useTranslation();
  const { brands, isLoading } = useBrands();

  const options = [
    ...(allLabel ? [{ value: "all", label: allLabel }] : []),
    ...brands.map((brand) => ({
      value: String(brand.id),
      label: brand.name ?? "",
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
          : (placeholder ?? t("select.brandPlaceholder"))
      }
      options={options}
      valueAsNumber
      disabled={disabled || isLoading}
      className={className}
    />
  );
};

export { BrandsSelect };
