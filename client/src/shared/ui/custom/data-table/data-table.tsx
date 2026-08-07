import { useTranslation } from "react-i18next";
import { useState, type ReactNode } from "react";
import {
  type ColumnDef,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/core/table";

import { DataTableHeader } from "./data-table-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableSkeleton } from "./data-table-skeleton";

interface DataTableProps<TData, TValue> {
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

const DataTable = <TData, TValue>({
  isLoading,
  columns,
  data,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  filters,
  actions,
  currentPage = 1,
  totalPages = 1,
  totalItems = data.length,
  pageSize = 20,
  onPageChange,
  sorting: externalSorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) => {
  const { t } = useTranslation();

  const isControlled = !!onSortingChange;

  const defaultSortColumn = columns.find(
    (col) => (col.meta as { defaultSort?: boolean })?.defaultSort,
  ) as { id?: string; accessorKey?: string } | undefined;

  const defaultSortId = defaultSortColumn?.id ?? defaultSortColumn?.accessorKey;

  const [internalSorting, setInternalSorting] = useState<SortingState>(
    defaultSortId ? [{ id: defaultSortId, desc: false }] : [],
  );

  const sorting = externalSorting ?? internalSorting;

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    if (isControlled) {
      onSortingChange!(next);
    } else {
      setInternalSorting(next);
    }
  };

  // TanStack Table returns functions that can't be safely memoized by the compiler.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: isControlled ? undefined : getSortedRowModel(),
    onSortingChange: handleSortingChange,
    enableSortingRemoval: false,
    manualSorting: isControlled,
    state: { sorting },
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={onSearchChange}
        filters={filters}
        actions={actions}
      />

      {isLoading ? (
        <DataTableSkeleton columnCount={columns.length} />
      ) : (
        <div className="animate-in fade-in-0 duration-600 overflow-hidden rounded-xl border border-outline">
          <Table>
            <DataTableHeader headerGroups={table.getHeaderGroups()} />
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="bg-white">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="bg-white">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-ink-tertiary"
                  >
                    {t("dataTable.noResults")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {onPageChange && totalPages > 1 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export { DataTable };
