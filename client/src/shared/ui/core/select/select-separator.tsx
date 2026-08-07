import type * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-wash", className)}
      {...props}
    />
  );
};

export { SelectSeparator };
