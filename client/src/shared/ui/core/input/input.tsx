import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/core/button";
import { Label } from "@/shared/ui/core/label";

const inputBoxVariants = cva(
  "flex h-11 w-full items-center gap-1 rounded-2xl border border-outline bg-transparent px-3 py-4 transition-colors has-[input:not(:placeholder-shown)]:border-[1.5px] has-[input:not(:focus):not(:placeholder-shown)]:bg-input-active focus-within:border-positive has-[:disabled]:border-outline has-[:disabled]:bg-disabled",
  {
    variants: {
      status: {
        error:
          "border-negative-600 bg-input-active focus-within:!border-negative-600",
        success: "border-success bg-input-active focus-within:!border-success",
        none: "",
      },
    },
    defaultVariants: {
      status: "none",
    },
  },
);

interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputBoxVariants> {
  label?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showPasswordAriaLabel?: string;
  hidePasswordAriaLabel?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  ref,
  className,
  type = "text",
  label,
  status,
  helperText,
  startIcon,
  endIcon,
  showPasswordAriaLabel = "Show password",
  hidePasswordAriaLabel = "Hide password",
  id,
  disabled,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className={cn(inputBoxVariants({ status }), className)}>
        {startIcon && (
          <span
            className="shrink-0 text-ink-tertiary [&>svg]:size-5"
            aria-hidden="true"
          >
            {startIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          data-slot="input"
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent text-sm leading-5 tracking-[0.25px] text-ink placeholder:text-ink-tertiary outline-none disabled:text-ink-disabled disabled:placeholder:text-ink-disabled"
          {...props}
        />
        {isPassword ? (
          <Button
            type="button"
            variant="ghost"
            iconOnly
            size={32}
            onClick={() => setShowPassword((value) => !value)}
            disabled={disabled}
            aria-label={
              showPassword ? hidePasswordAriaLabel : showPasswordAriaLabel
            }
            className="text-ink-tertiary hover:bg-transparent hover:text-ink-tertiary active:bg-transparent active:text-ink-tertiary [&_svg]:size-5"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        ) : (
          endIcon && (
            <span
              className="shrink-0 text-ink-tertiary [&>svg]:size-5"
              aria-hidden="true"
            >
              {endIcon}
            </span>
          )
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

export { Input, inputBoxVariants };
