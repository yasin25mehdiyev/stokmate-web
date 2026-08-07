import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableCellProps extends React.ComponentProps<"td"> {
  ref?: React.Ref<HTMLTableCellElement>;
}

const TableCell = ({ ref, className, ...props }: TableCellProps) => {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "p-4 align-middle text-ink [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};

export { TableCell };
