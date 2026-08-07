import { AlertTriangle, Package, PackageX } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useSmoothLoading } from "@/shared/hooks/use-smooth-loading";
import { Skeleton } from "@/shared/ui/core/skeleton";
import { Typography } from "@/shared/ui/core/typography";
import { useProductsStats } from "@/entities/products";
import { StockProgressBar } from "./stock-progress-bar";

const cardClassName =
  "rounded-2xl bg-white p-6 shadow-[0px_2px_2px_rgba(0,0,0,0.08),0px_0px_1px_rgba(0,0,0,0.08)]";

const ProductStats = () => {
  const { t } = useTranslation("dashboard", { keyPrefix: "stats" });
  const {
    total,
    lowStock,
    outOfStock,
    isLoading: isLoadingRaw,
  } = useProductsStats();
  const isLoading = useSmoothLoading(isLoadingRaw);
  const normal = Math.max(0, total - lowStock - outOfStock);

  const cards = [
    {
      key: "total",
      label: t("totalProducts"),
      value: total,
      icon: Package,
      iconBg: "bg-wash",
      iconColor: "text-ink-secondary",
      valueColor: "text-ink",
    },
    {
      key: "lowStock",
      label: t("criticalStock"),
      value: lowStock,
      icon: AlertTriangle,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
      valueColor: "text-warning",
    },
    {
      key: "outOfStock",
      label: t("outOfStock"),
      value: outOfStock,
      icon: PackageX,
      iconBg: "bg-negative-wash",
      iconColor: "text-negative-600",
      valueColor: "text-negative-600",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.key} className={cardClassName}>
            <div className="flex items-center gap-2">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <card.icon className={`size-4 ${card.iconColor}`} />
              </span>
              <Typography variant="span" color="secondary">
                {card.label}
              </Typography>
            </div>

            {isLoading ? (
              <Skeleton className="mt-3 h-9 w-16" />
            ) : (
              <Typography
                variant="h4"
                as="p"
                className={`mt-1 ${card.valueColor}`}
              >
                {card.value}
              </Typography>
            )}
          </div>
        ))}
      </div>

      <div className={cardClassName}>
        <Typography variant="h6" as="h2" className="mb-4">
          {t("stockStatus")}
        </Typography>

        {isLoading ? (
          <Skeleton className="h-3 w-full rounded-full" />
        ) : (
          <StockProgressBar
            normal={normal}
            lowStock={lowStock}
            outOfStock={outOfStock}
            total={total}
          />
        )}
      </div>
    </div>
  );
};

export { ProductStats };
