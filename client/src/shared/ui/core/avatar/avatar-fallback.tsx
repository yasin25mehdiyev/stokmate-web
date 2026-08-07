import type * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const AvatarFallback = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-wash text-ink-secondary",
        className,
      )}
      {...props}
    />
  );
};

export { AvatarFallback };
