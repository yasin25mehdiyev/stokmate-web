import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface StockProgressBarProps {
  normal: number;
  lowStock: number;
  outOfStock: number;
  total: number;
}

const StockProgressBar = ({
  normal,
  lowStock,
  outOfStock,
  total,
}: StockProgressBarProps) => {
  const { t } = useTranslation("dashboard", { keyPrefix: "stats" });
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateIn(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const pct = (value: number) => (total > 0 ? (value / total) * 100 : 0);

  const segments = [
    { key: "normal", value: normal, className: "bg-success", delay: "delay-0" },
    {
      key: "critical",
      value: lowStock,
      className: "bg-warning",
      delay: "delay-150",
    },
    {
      key: "outOfStock",
      value: outOfStock,
      className: "bg-negative-500",
      delay: "delay-300",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-wash">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={`h-full ${segment.className} ${segment.delay} transition-[width] duration-700 ease-out`}
            style={{ width: `${animateIn ? pct(segment.value) : 0}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className="flex items-center gap-1.5 text-sm text-ink-secondary"
          >
            <span className={`size-2.5 rounded-full ${segment.className}`} />
            {t(segment.key)} · {segment.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export { StockProgressBar };
