import type * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-3 py-1.5 text-xs leading-4 font-medium tracking-[0.4px] text-ink-tertiary",
        className,
      )}
      {...props}
    />
  );
};

export { SelectLabel };
