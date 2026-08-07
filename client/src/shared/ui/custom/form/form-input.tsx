import * as React from "react";
import {
  Controller,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Input } from "@/shared/ui/core/input";

type InputProps = React.ComponentProps<typeof Input>;

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<InputProps, "name"> {
  name?: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
}

const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  status,
  helperText,
  ...props
}: FormInputProps<TFieldValues>) => {
  const formContext = useFormContext<TFieldValues>();
  const resolvedControl = control ?? formContext?.control;

  if (!resolvedControl || !name) {
    return <Input status={status} helperText={helperText} {...props} />;
  }

  return (
    <Controller
      control={resolvedControl}
      name={name}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          {...props}
          status={fieldState.error ? "error" : status}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
};

export { FormInput };
