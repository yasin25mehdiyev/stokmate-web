import { Link } from "@tanstack/react-router";
import { LayoutDashboard, ChevronRight } from "lucide-react";

import { useBreadcrumb } from "./lib/use-breadcrumb";

const Breadcrumb = () => {
  const items = useBreadcrumb();

  return (
    <div className="flex items-center gap-1.5">
      <Link to="/dashboard">
        <div className="flex size-5 items-center justify-center rounded bg-wash">
          <LayoutDashboard className="size-3 text-brand-500" />
        </div>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 text-ink-tertiary" />
          {item.href ? (
            <a
              href={item.href}
              className="text-sm text-ink-secondary hover:text-ink"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-sm font-medium text-ink">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export { Breadcrumb };
