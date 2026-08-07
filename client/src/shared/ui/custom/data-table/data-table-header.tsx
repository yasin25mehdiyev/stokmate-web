import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "lucide-react";

import { TableHead, TableHeader, TableRow } from "@/shared/ui/core/table";
import { cn } from "@/shared/lib";

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

const DataTableHeader = <TData,>({
  headerGroups,
}: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className="bg-brand-500 hover:bg-brand-500"
        >
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted();

            return (
              <TableHead
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className={cn("text-white", {
                  "cursor-pointer select-none": canSort,
                })}
              >
                <div className="flex items-center gap-1.5">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {canSort && (
                    <>
                      {sortDirection === "asc" && (
                        <ChevronUp className="size-3.5" />
                      )}
                      {sortDirection === "desc" && (
                        <ChevronDown className="size-3.5" />
                      )}
                    </>
                  )}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export { DataTableHeader };
