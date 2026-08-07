import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableCaptionProps extends React.ComponentProps<"caption"> {
  ref?: React.Ref<HTMLTableCaptionElement>;
}

const TableCaption = ({ ref, className, ...props }: TableCaptionProps) => {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-ink-secondary", className)}
      {...props}
    />
  );
};

export { TableCaption };
