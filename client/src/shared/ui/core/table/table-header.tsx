import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableHeaderProps extends React.ComponentProps<"thead"> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

const TableHeader = ({ ref, className, ...props }: TableHeaderProps) => {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("[&_tr]:border-b [&_tr]:border-wash", className)}
      {...props}
    />
  );
};

export { TableHeader };
