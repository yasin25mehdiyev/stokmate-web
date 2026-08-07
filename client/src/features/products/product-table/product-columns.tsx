import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import type { TFunction } from "i18next";

import { formatDateTime, formatPrice } from "@/shared/lib";
import { DataTableRowActions } from "@/shared/ui/custom/data-table";
import { ImagePreview } from "@/shared/ui/custom/image-preview";
import {
  StatusBadge,
  type statusBadgeVariants,
} from "@/shared/ui/custom/status-badge";
import { ProductStatus, type Product } from "@/entities/products";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>["variant"]
>;

interface UseProductColumnsProps {
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (product: Product) => void;
  locale: string;
  t: TFunction<"products">;
}

const useProductColumns = ({
  onEdit,
  onView,
  onDelete,
  locale,
  t,
}: UseProductColumnsProps): ColumnDef<Product>[] => {
  const statusMeta: Record<
    ProductStatus,
    { label: string; variant: BadgeVariant }
  > = {
    [ProductStatus.NUMBER_1]: { label: t("status.active"), variant: "success" },
    [ProductStatus.NUMBER_2]: {
      label: t("status.inactive"),
      variant: "neutral",
    },
    [ProductStatus.NUMBER_3]: {
      label: t("status.discontinued"),
      variant: "error",
    },
  };

  return [
    {
      accessorKey: "name",
      header: t("table.name"),
      cell: ({ row: { original } }) => (
        <Link
          to="/products/$productId"
          params={{ productId: String(original.id) }}
          className="flex items-center gap-3 font-medium text-ink hover:text-brand-500"
        >
          <ImagePreview
            src={original.imageUrl}
            alt=""
            className="size-9 shrink-0"
          />
          <span className="truncate">{original.name}</span>
        </Link>
      ),
    },
    {
      accessorKey: "categoryName",
      header: t("table.category"),
      enableSorting: false,
    },
    {
      accessorKey: "brandName",
      header: t("table.brand"),
      enableSorting: false,
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      cell: ({ row: { original } }) => formatPrice(original.price ?? 0),
    },
    {
      accessorKey: "stock",
      header: t("table.stock"),
      cell: ({ row: { original } }) => {
        const stock = original.stock ?? 0;
        const minStock = original.minStock ?? 0;

        if (stock === 0)
          return <StatusBadge variant="error" label={t("table.outOfStock")} />;
        if (stock <= minStock)
          return (
            <StatusBadge
              variant="warning"
              label={`${stock} · ${t("table.lowStock")}`}
            />
          );
        return <span className="text-ink">{stock}</span>;
      },
    },
    {
      accessorKey: "status",
      header: t("table.status"),
      enableSorting: false,
      cell: ({ row: { original } }) => {
        const meta = statusMeta[original.status ?? ProductStatus.NUMBER_1];
        return <StatusBadge variant={meta.variant} label={meta.label} />;
      },
    },
    {
      accessorKey: "updatedAt",
      header: t("table.updatedAt"),
      cell: ({ row: { original } }) =>
        original.updatedAt ? formatDateTime(locale, original.updatedAt) : "—",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row.original}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      ),
      enableSorting: false,
    },
  ];
};

export { useProductColumns };
