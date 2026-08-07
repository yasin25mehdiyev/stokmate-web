import * as React from "react";
import {
  Controller,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/shared/lib";
import { Label } from "@/shared/ui/core/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/core/select";

type SelectTriggerProps = React.ComponentProps<typeof SelectTrigger>;

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<SelectTriggerProps, "name" | "children"> {
  name?: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onValueChange?: (value: string) => void;
  valueAsNumber?: boolean;
}

const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  status,
  helperText,
  placeholder,
  options,
  value,
  onValueChange,
  valueAsNumber = false,
  className,
  ...props
}: FormSelectProps<TFieldValues>) => {
  const formContext = useFormContext<TFieldValues>();
  const resolvedControl = control ?? formContext?.control;

  const renderSelect = (
    selectValue: string | number | null | undefined,
    onChange: ((value: string) => void) | undefined,
    resolvedStatus: FormSelectProps<TFieldValues>["status"],
    resolvedHelperText: string | undefined,
  ) => {
    const stringValue =
      selectValue === null || selectValue === undefined
        ? ""
        : String(selectValue);

    return (
      <div className="flex flex-col gap-1">
        {label && <Label>{label}</Label>}
        <Select value={stringValue} onValueChange={onChange}>
          <SelectTrigger
            status={resolvedStatus}
            className={className}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {resolvedHelperText && (
          <span
            className={cn(
              "text-xs leading-4",
              resolvedStatus === "error"
                ? "text-negative-600"
                : "text-ink-secondary",
            )}
          >
            {resolvedHelperText}
          </span>
        )}
      </div>
    );
  };

  if (!resolvedControl || !name) {
    return renderSelect(value, onValueChange, status, helperText);
  }

  return (
    <Controller
      control={resolvedControl}
      name={name}
      render={({ field, fieldState }) =>
        renderSelect(
          field.value as string | number | null | undefined,
          (nextValue) =>
            field.onChange(valueAsNumber ? Number(nextValue) : nextValue),
          fieldState.error ? "error" : status,
          fieldState.error?.message ?? helperText,
        )
      }
    />
  );
};

export { FormSelect };
