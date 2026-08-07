import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";
import { Label } from "@/shared/ui/core/label";

const textareaVariants = cva(
  "min-h-24 w-full resize-none rounded-2xl border border-outline bg-transparent px-3 py-3 text-sm leading-5 tracking-[0.25px] text-ink transition-colors outline-none not-placeholder-shown:not-focus:bg-input-active placeholder:text-ink-tertiary focus:border-positive disabled:cursor-not-allowed disabled:border-outline disabled:bg-disabled disabled:text-ink-disabled",
  {
    variants: {
      status: {
        error: "border-negative-600 bg-input-active focus:!border-negative-600",
        success: "border-success bg-input-active focus:!border-success",
        none: "",
      },
    },
    defaultVariants: {
      status: "none",
    },
  },
);

interface TextareaProps
  extends
    Omit<React.ComponentProps<"textarea">, "defaultValue">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  maxLength?: number;
  defaultValue?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const getInitialCount = (value: unknown, defaultValue: unknown): number => {
  if (typeof value === "string") return value.length;
  if (typeof defaultValue === "string") return defaultValue.length;
  return 0;
};

const Textarea = ({
  ref,
  className,
  status,
  label,
  helperText,
  maxLength,
  onChange,
  value,
  defaultValue,
  id,
  disabled,
  ...props
}: TextareaProps) => {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const isControlled = typeof value === "string";

  const [uncontrolledCount, setUncontrolledCount] = React.useState<number>(() =>
    getInitialCount(value, defaultValue),
  );

  const count = isControlled ? value.length : uncontrolledCount;
  const isAtLimit = maxLength !== undefined && count >= maxLength;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) setUncontrolledCount(event.target.value.length);
    onChange?.(event);
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          data-slot="textarea"
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            textareaVariants({ status }),
            maxLength && "pb-6",
            className,
          )}
          {...props}
        />
        {maxLength && (
          <span
            className={cn(
              "absolute right-3 bottom-2 text-xs tabular-nums",
              isAtLimit ? "text-negative-600" : "text-ink-tertiary",
            )}
          >
            {count}/{maxLength}
          </span>
        )}
      </div>
      {helperText && (
        <span
          className={cn(
            "text-xs leading-4",
            status === "error" ? "text-negative-600" : "text-ink-secondary",
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export { Textarea, textareaVariants };
