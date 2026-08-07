import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableBodyProps extends React.ComponentProps<"tbody"> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableBody = ({ ref, className, ...props }: TableBodyProps) => {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

export { TableBody };
