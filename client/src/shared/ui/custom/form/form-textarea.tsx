import * as React from "react";
import {
  Controller,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Textarea } from "@/shared/ui/core/textarea";

type TextareaProps = React.ComponentProps<typeof Textarea>;

interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<TextareaProps, "name"> {
  name?: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
}

const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  status,
  helperText,
  ...props
}: FormTextareaProps<TFieldValues>) => {
  const formContext = useFormContext<TFieldValues>();
  const resolvedControl = control ?? formContext?.control;

  if (!resolvedControl || !name) {
    return <Textarea status={status} helperText={helperText} {...props} />;
  }

  return (
    <Controller
      control={resolvedControl}
      name={name}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          {...props}
          status={fieldState.error ? "error" : status}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  );
};

export { FormTextarea };
