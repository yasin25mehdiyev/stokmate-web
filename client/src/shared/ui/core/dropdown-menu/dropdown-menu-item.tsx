import type * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const dropdownMenuItemVariants = cva(
  "flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-sm leading-5 tracking-[0.25px] outline-none transition-colors select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-ink [&_svg]:text-ink-tertiary data-[highlighted]:bg-wash data-[highlighted]:text-brand-500 data-[highlighted]:[&_svg]:text-brand-500",
        destructive:
          "text-negative-600 [&_svg]:text-negative-600 data-[highlighted]:bg-negative-wash",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const DropdownMenuItem = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuItemVariants>) => {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(dropdownMenuItemVariants({ variant, className }))}
      {...props}
    />
  );
};

export { DropdownMenuItem, dropdownMenuItemVariants };
