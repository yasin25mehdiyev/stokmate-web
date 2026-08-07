import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { isKnownSegment } from "@/shared/lib/is-known-segment";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const useBreadcrumb = (): BreadcrumbItem[] => {
  const location = useLocation();
  const { t } = useTranslation("common", { keyPrefix: "breadcrumb" });

  const segments = location.pathname.split("/").filter(Boolean);

  const items = segments.map((segment, index): BreadcrumbItem | null => {
    const isId = /^\d+$/.test(segment);

    if (isId || !isKnownSegment(segment)) return null;

    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    return isLast ? { label: t(segment) } : { label: t(segment), href };
  });

  return items.filter((item): item is BreadcrumbItem => item !== null);
};

export { useBreadcrumb, type BreadcrumbItem };
