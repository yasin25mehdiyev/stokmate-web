import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/core/button";
import { cn } from "@/shared/lib";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const DataTablePagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: DataTablePaginationProps) => {
  const { t } = useTranslation();

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-ink-tertiary">
        {t("dataTable.showingResults", { total: totalItems, from, to })}
      </span>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          color="brand"
          size={32}
          iconOnly
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-sm text-ink-tertiary"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              type="button"
              variant={currentPage === page ? "primary" : "outline"}
              color="brand"
              size={32}
              className={cn("aspect-square px-0", {
                "cursor-default": currentPage === page,
              })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          type="button"
          variant="outline"
          color="brand"
          size={32}
          iconOnly
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export { DataTablePagination };
