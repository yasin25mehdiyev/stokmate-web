import type * as React from "react";

import { cn } from "@/shared/lib";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-wash", className)}
      {...props}
    />
  );
};

export { Skeleton };
