import type * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

const Tooltip = (props: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};

export { Tooltip };
