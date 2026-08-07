import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableHeadProps extends React.ComponentProps<"th"> {
  ref?: React.Ref<HTMLTableCellElement>;
}

const TableHead = ({ ref, className, ...props }: TableHeadProps) => {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle text-sm font-medium text-ink-secondary [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};

export { TableHead };
