import { Link, useMatchRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib";

interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  to?: string;
  collapsed?: boolean;
}

const SidebarItem = ({
  label,
  icon: Icon,
  to,
  collapsed,
}: SidebarItemProps) => {
  const matchRoute = useMatchRoute();
  const isActive = to ? Boolean(matchRoute({ to, fuzzy: true })) : false;

  const className = cn(
    "flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-3 text-sm leading-5 tracking-[0.25px] whitespace-nowrap text-ink transition-colors hover:bg-wash hover:text-brand-500 hover:[&_svg]:text-brand-500 [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:text-ink-tertiary",
    {
      "bg-brand-100/40 font-medium text-brand-500 shadow-[0px_1px_3px_0px_rgba(6,42,126,0.13)] [&_svg]:text-brand-500":
        isActive,
      "justify-center px-0'": collapsed,
    },
  );

  if (to) {
    return (
      <Link
        to={to}
        title={collapsed ? label : undefined}
        aria-label={collapsed ? label : undefined}
        className={className}
      >
        <Icon />
        {!collapsed && (
          <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        )}
      </Link>
    );
  }

  return (
    <span className={className} title={collapsed ? label : undefined}>
      <Icon />
      {!collapsed && (
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      )}
    </span>
  );
};

export { SidebarItem };
