import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableRowProps extends React.ComponentProps<"tr"> {
  ref?: React.Ref<HTMLTableRowElement>;
}

const TableRow = ({ ref, className, ...props }: TableRowProps) => {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "cursor-pointer border-b border-wash transition-colors hover:bg-wash",
        className,
      )}
      {...props}
    />
  );
};

export { TableRow };
