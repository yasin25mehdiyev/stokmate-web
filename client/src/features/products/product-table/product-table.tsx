import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";
import type { SortingState } from "@tanstack/react-table";

import { useDebounce } from "@/shared/hooks/use-debounce";
import { useSmoothLoading } from "@/shared/hooks/use-smooth-loading";
import { TABLE_PAGE_SIZE } from "@/shared/config/constants";
import { DataTable } from "@/shared/ui/custom/data-table";
import { ConfirmDialog } from "@/shared/ui/custom/confirm-dialog";
import {
  useProducts,
  type Product,
  type ProductListParams,
} from "@/entities/products";
import { useDeleteProduct } from "./lib/use-delete-product";
import { useFilterProduct } from "./lib/use-filter-product";
import { useProductColumns } from "./product-columns";

interface ProductTableProps {
  actions?: ReactNode;
}

const ProductTable = ({ actions }: ProductTableProps) => {
  const { t, i18n } = useTranslation("products");
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "updatedAt", desc: true },
  ]);

  const debouncedSearch = useDebounce(search, 400);

  const {
    categoryId,
    brandId,
    filters,
  } = useFilterProduct({ onChange: () => setCurrentPage(1) });

  const {
    products,
    total,
    isLoading: isLoadingRaw,
    error,
  } = useProducts({
    q: debouncedSearch,
    categoryId,
    brandId,
    page: currentPage,
    pageSize: TABLE_PAGE_SIZE,
    sort: sorting[0]?.id as ProductListParams["sort"],
    dir: sorting[0]?.desc ? "desc" : "asc",
  });
  const isLoading = useSmoothLoading(isLoadingRaw);

  if (error) throw error;

  const { handleDelete, confirmDialogProps } = useDeleteProduct();

  const columns = useProductColumns({
    onEdit: (product: Product) =>
      router.navigate({
        to: "/products/$productId/update",
        params: { productId: String(product.id) },
      }),
    onView: (product: Product) =>
      router.navigate({
        to: "/products/$productId",
        params: { productId: String(product.id) },
      }),
    onDelete: handleDelete,
    locale: i18n.language,
    t,
  });

  const totalPages = Math.max(1, Math.ceil(total / TABLE_PAGE_SIZE));

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={products}
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        sorting={sorting}
        onSortingChange={(nextSorting) => {
          setSorting(nextSorting);
          setCurrentPage(1);
        }}
        filters={filters}
        actions={actions}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={total}
        pageSize={TABLE_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

      <ConfirmDialog {...confirmDialogProps} />
    </>
  );
};

export { ProductTable };
