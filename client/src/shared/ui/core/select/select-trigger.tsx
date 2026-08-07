import type * as React from "react";
import { ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const selectTriggerVariants = cva(
  "flex h-11 w-full cursor-pointer items-center justify-between gap-1 rounded-2xl border border-outline bg-transparent px-3 py-4 text-sm text-ink transition-colors outline-none not-data-[placeholder]:data-[state=closed]:bg-input-active data-[placeholder]:text-ink-tertiary focus:border-positive disabled:cursor-not-allowed disabled:border-outline disabled:bg-disabled disabled:text-ink-disabled [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-ink-tertiary",
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

interface SelectTriggerProps
  extends
    React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = ({
  className,
  status,
  children,
  ...props
}: SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ status }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export { SelectTrigger, selectTriggerVariants };
