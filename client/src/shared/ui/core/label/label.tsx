import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-xs leading-4 font-medium tracking-[0.4px] text-ink select-none peer-disabled:cursor-not-allowed peer-disabled:text-ink-disabled",
        className,
      )}
      {...props}
    />
  );
};

export { Label };
