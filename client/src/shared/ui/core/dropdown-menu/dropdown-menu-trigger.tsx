import type * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

const DropdownMenuTrigger = (
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) => {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
};

export { DropdownMenuTrigger };
