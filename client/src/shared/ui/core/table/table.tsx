import type * as React from "react";

import { cn } from "@/shared/lib";

interface TableProps extends React.ComponentProps<"table"> {
  ref?: React.Ref<HTMLTableElement>;
}

const Table = ({ ref, className, ...props }: TableProps) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

export { Table };
