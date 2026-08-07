import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableFooterProps extends React.ComponentProps<"tfoot"> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableFooter = ({ ref, className, ...props }: TableFooterProps) => {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "border-t border-wash bg-wash font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
};

export { TableFooter };
