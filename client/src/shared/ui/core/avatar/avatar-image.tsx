import type * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const AvatarImage = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
};

export { AvatarImage };
