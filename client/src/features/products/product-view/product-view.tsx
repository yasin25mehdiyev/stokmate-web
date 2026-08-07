import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { VariantProps } from "class-variance-authority";

import { formatDateTime, formatPrice } from "@/shared/lib";
import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";
import { ImagePreview } from "@/shared/ui/custom/image-preview";
import {
  StatusBadge,
  type statusBadgeVariants,
} from "@/shared/ui/custom/status-badge";
import { ProductStatus, ProductUnit, type Product } from "@/entities/products";

type BadgeVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>["variant"]
>;

interface ProductViewProps {
  product: Product;
}

const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <Typography variant="span" color="secondary">
        {label}
      </Typography>
      <Typography variant="span" className="text-right font-medium">
        {value}
      </Typography>
    </div>
  );
};

const ProductView = ({ product }: ProductViewProps) => {
  const { t, i18n } = useTranslation("products");

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

  const unitLabels: Record<ProductUnit, string> = {
    [ProductUnit.NUMBER_1]: t("unit.piece"),
    [ProductUnit.NUMBER_2]: t("unit.kg"),
    [ProductUnit.NUMBER_3]: t("unit.liter"),
    [ProductUnit.NUMBER_4]: t("unit.box"),
  };

  const meta = statusMeta[product.status ?? ProductStatus.NUMBER_1];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <Typography variant="h5" as="h2">
              {product.name}
            </Typography>
            <StatusBadge variant={meta.variant} label={meta.label} />
          </div>
          <Typography variant="span" color="secondary" className="mt-1 block">
            {t("table.sku")}: {product.sku}
            {product.updatedAt && (
              <>
                {" "}
                · {t("view.lastUpdated")}{" "}
                {formatDateTime(i18n.language, product.updatedAt)}
              </>
            )}
          </Typography>
        </div>

        <Button variant="outline" color="brand" size={36} asChild>
          <Link
            to="/products/$productId/update"
            params={{ productId: String(product.id) }}
          >
            <Pencil />
            {t("view.edit")}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        <ImagePreview
          src={product.imageUrl}
          alt={product.name ?? ""}
          className="h-full min-h-80 w-full"
        />

        <div className="rounded-2xl bg-white p-6 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)]">
          <Typography variant="h6" as="h3" className="mb-2">
            {t("view.basicInfo")}
          </Typography>
          <div className="divide-y divide-wash">
            <InfoRow label={t("form.name")} value={product.name} />
            <InfoRow label={t("table.sku")} value={product.sku} />
            <InfoRow label={t("form.barcode")} value={product.barcode || "—"} />
            <InfoRow
              label={t("form.category")}
              value={product.categoryName || "—"}
            />
            <InfoRow label={t("form.brand")} value={product.brandName || "—"} />
            <InfoRow
              label={t("form.supplier")}
              value={product.supplierName || "—"}
            />
            <InfoRow
              label={t("form.price")}
              value={formatPrice(product.price ?? 0)}
            />
            <InfoRow
              label={t("form.costPrice")}
              value={product.costPrice ? formatPrice(product.costPrice) : "—"}
            />
            <InfoRow label={t("form.stock")} value={product.stock ?? 0} />
            <InfoRow label={t("form.minStock")} value={product.minStock ?? 0} />
            <InfoRow
              label={t("form.unit")}
              value={unitLabels[product.unit ?? ProductUnit.NUMBER_1]}
            />
            <InfoRow
              label={t("table.updatedAt")}
              value={
                product.updatedAt
                  ? formatDateTime(i18n.language, product.updatedAt)
                  : "—"
              }
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)]">
        <Typography variant="h6" as="h3" className="mb-2">
          {t("form.description")}
        </Typography>
        <Typography variant="p" color="secondary">
          {product.description || t("view.noDescription")}
        </Typography>
      </div>
    </div>
  );
};

export { ProductView };
