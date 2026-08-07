import type * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const Avatar = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-9 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
};

export { Avatar };
