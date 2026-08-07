import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/shared/lib";

const buttonVariants = cva(
  "cursor-pointer group/button relative inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap outline-none transition-colors select-none focus-visible:ring-3 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        outline: "border",
        ghost: "",
      },
      color: {
        brand: "",
        negative: "",
      },
      size: {
        24: "h-6 gap-1 px-2 py-0 text-xs leading-4 tracking-[0.4px] [&_svg]:size-4",
        28: "h-7 gap-1 px-2 py-0 text-xs leading-4 tracking-[0.4px] [&_svg]:size-4",
        32: "h-8 gap-1 px-3 py-1 text-sm leading-6 tracking-[0.1px] [&_svg]:size-4",
        36: "h-9 gap-1 px-3 py-1 text-sm leading-6 tracking-[0.1px] [&_svg]:size-4",
        44: "h-11 gap-1 px-3 py-2 text-sm leading-6 tracking-[0.1px] [&_svg]:size-5",
        48: "h-12 gap-1 px-4 py-3 text-sm leading-6 tracking-[0.1px] [&_svg]:size-5",
        52: "h-13 gap-1 px-4 py-3 text-base leading-6 tracking-[0.15px] [&_svg]:size-5",
      },
      loading: {
        true: "",
        false: "",
      },
      iconOnly: {
        true: "aspect-square gap-0 px-0 py-0",
        false: "",
      },
    },
    compoundVariants: [
      // Primary
      {
        variant: "primary",
        color: "brand",
        className:
          "bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-700 disabled:bg-disabled disabled:text-ink-disabled",
      },
      {
        variant: "primary",
        color: "negative",
        className:
          "bg-negative-500 text-white hover:bg-negative-400 active:bg-negative-700 disabled:bg-disabled disabled:text-ink-disabled",
      },
      // Outline
      {
        variant: "outline",
        color: "brand",
        className:
          "border-brand-100 bg-transparent text-brand-500 hover:border-[1.5px] hover:border-brand-400 hover:bg-wash active:border-2 active:border-brand-500 active:text-brand-700 disabled:border-disabled-border disabled:bg-disabled disabled:text-ink-disabled",
      },
      {
        variant: "outline",
        color: "negative",
        className:
          "border-negative-500 bg-transparent text-negative-600 hover:border-[1.5px] active:border-2 disabled:border-disabled-border disabled:bg-disabled disabled:text-ink-disabled",
      },
      // Ghost
      {
        variant: "ghost",
        color: "brand",
        className:
          "bg-transparent text-ink hover:bg-wash hover:text-brand-500 active:bg-wash active:text-brand-700 disabled:bg-transparent disabled:text-ink-disabled",
      },
      {
        variant: "ghost",
        color: "negative",
        className:
          "bg-transparent text-negative-600 disabled:bg-transparent disabled:text-ink-disabled",
      },
      // Loader
      {
        variant: "primary",
        color: "brand",
        loading: true,
        className: "bg-brand-100 text-brand-500",
      },
      {
        variant: "primary",
        color: "negative",
        loading: true,
        className: "bg-negative-wash text-negative-600",
      },
      {
        variant: "outline",
        color: "negative",
        loading: true,
        className: "border-negative-600",
      },
      {
        variant: "ghost",
        color: "brand",
        loading: true,
        className: "text-brand-500",
      },
    ],
    defaultVariants: {
      variant: "primary",
      color: "brand",
      size: 44,
      loading: false,
      iconOnly: false,
    },
  },
);

const ButtonLoader = () => {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-current" />
    </span>
  );
};

const Button = ({
  className,
  variant,
  color,
  size,
  loading = false,
  iconOnly = false,
  asChild = false,
  disabled,
  startIcon,
  endIcon,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  }) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={cn(
        buttonVariants({ variant, color, size, loading, iconOnly, className }),
      )}
      disabled={disabled || !!loading}
      aria-busy={!!loading || undefined}
      {...props}
    >
      {asChild ? (
        loading ? (
          <ButtonLoader />
        ) : (
          [
            <React.Fragment key="start-icon">{startIcon}</React.Fragment>,
            <Slot.Slottable key="slottable">{children}</Slot.Slottable>,
            <React.Fragment key="end-icon">{endIcon}</React.Fragment>,
          ]
        )
      ) : (
        <>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <ButtonLoader />
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1",
              loading && "invisible",
            )}
          >
            {startIcon}
            {children}
            {endIcon}
          </span>
        </>
      )}
    </Comp>
  );
};

export { Button, buttonVariants };
