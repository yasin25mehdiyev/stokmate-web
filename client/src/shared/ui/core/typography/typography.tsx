import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[80px] leading-[88px] tracking-[-0.5px] font-bold",
      h2: "text-[60px] leading-[72px] tracking-[-0.5px] font-bold",
      h3: "text-[40px] leading-[48px] font-bold",
      h4: "text-[32px] leading-[40px] tracking-[0.25px] font-bold",
      h5: "text-2xl leading-[32px] font-medium",
      h6: "text-xl leading-[28px] tracking-[0.15px] font-medium",
      p: "text-base leading-6 tracking-[0.05px] font-normal",
      span: "text-sm leading-5 tracking-[0.25px] font-normal",
    },
    color: {
      primary: "text-ink",
      secondary: "text-ink-secondary",
      tertiary: "text-ink-tertiary",
      disabled: "text-ink-disabled",
      brand: "text-brand-500",
      "brand-bold": "text-brand-700",
      "secondary-brand": "text-secondary-brand",
      "secondary-brand-bold": "text-secondary-brand-bold",
      positive: "text-positive",
      warning: "text-warning",
      negative: "text-negative-600",
      success: "text-success",
      "inverse-primary": "text-white",
      "inverse-ghost": "text-ink",
      "inverse-secondary": "text-white/70",
      "inverse-tertiary": "text-white/50",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "primary",
  },
});

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

const defaultTagByVariant: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  span: "span",
};

interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = ({
  className,
  variant,
  color,
  as,
  ...props
}: TypographyProps) => {
  const resolvedVariant = variant ?? "p";
  const Comp = as ?? defaultTagByVariant[resolvedVariant];

  return (
    <Comp
      data-slot="typography"
      className={cn(
        typographyVariants({ variant: resolvedVariant, color, className }),
      )}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
