import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const statusBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs leading-4 font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-negative-wash text-negative-600",
        neutral: "bg-wash text-ink-secondary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

interface StatusBadgeProps
  extends
    React.ComponentProps<"span">,
    VariantProps<typeof statusBadgeVariants> {
  label: string;
}

const StatusBadge = ({
  className,
  variant,
  label,
  ...props
}: StatusBadgeProps) => {
  return (
    <span
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    >
      {label}
    </span>
  );
};

export { StatusBadge, statusBadgeVariants };
