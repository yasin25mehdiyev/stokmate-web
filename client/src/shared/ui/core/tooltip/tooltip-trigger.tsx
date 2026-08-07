import type * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

const TooltipTrigger = (
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>,
) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

export { TooltipTrigger };
