import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelect } from "@/shared/ui/custom/form";
import { useSuppliers } from "./queries";

interface SuppliersSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SuppliersSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  className,
}: SuppliersSelectProps<TFieldValues>) => {
  const { t } = useTranslation();
  const { suppliers, isLoading } = useSuppliers();

  const options = suppliers.map((supplier) => ({
    value: String(supplier.id),
    label: supplier.name ?? "",
  }));

  return (
    <FormSelect
      name={name}
      control={control}
      label={label}
      placeholder={
        isLoading
          ? t("select.loading")
          : (placeholder ?? t("select.supplierPlaceholder"))
      }
      options={options}
      valueAsNumber
      disabled={disabled || isLoading}
      className={className}
    />
  );
};

export { SuppliersSelect };
