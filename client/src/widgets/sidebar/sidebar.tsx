import { ChevronLeft, LogOut, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Logo } from "@/shared/icons/logo";
import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";
import { UserAvatar } from "@/shared/ui/custom/user-avatar";
import { formatToday } from "@/shared/lib/format-today";
import { useGetCurrentUser } from "@/entities/profile";
import { useLogout } from "@/features/auth/logout";
import { LanguageSwitcher } from "@/widgets/language-switcher";
import { useSidebarCollapsed } from "./lib/use-sidebar-collapsed";
import { sidebarNavItems } from "./model/sidebar-items";
import { SidebarItem } from "./ui/sidebar-item";
import { SidebarSupport } from "./ui/sidebar-support";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const Sidebar = ({ mobileOpen, onMobileOpenChange }: SidebarProps) => {
  const { t, i18n } = useTranslation();
  const { collapsed, toggleCollapsed } = useSidebarCollapsed();
  const { response: user } = useGetCurrentUser();
  const { handleLogout } = useLogout();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-full -translate-x-full flex-col bg-white transition-transform duration-300",
        "md:sticky md:inset-auto md:top-0 md:h-auto md:translate-x-0 md:gap-4 md:rounded-3xl md:p-5 md:shadow-[0px_10px_12.5px_0px_rgba(0,61,143,0.1)]",
        mobileOpen && "translate-x-0",
        collapsed
          ? "md:w-[84px] md:items-center md:p-3"
          : "md:w-[280px] md:p-5",
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-wash p-4 md:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <UserAvatar
            imageUrl={user?.imageUrl ?? undefined}
            name={user?.fullName ?? undefined}
          />
          <div className="flex min-w-0 flex-col">
            <Typography
              as="span"
              variant="span"
              className="truncate font-medium text-ink"
            >
              {user?.fullName}
            </Typography>
            <Typography
              as="span"
              variant="span"
              color="secondary"
              className="truncate text-xs"
            >
              {user?.email} · {formatToday(i18n.language)}
            </Typography>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="ghost"
            size={36}
            iconOnly
            onClick={() => onMobileOpenChange(false)}
            aria-label={t("header.closeMenu")}
            className="shrink-0 rounded-full bg-wash hover:bg-wash"
          >
            <X />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "hidden w-full shrink-0 items-center pt-2 pb-1 md:flex",
          collapsed && "md:justify-center",
        )}
      >
        <Logo />
      </div>

      <nav className="flex w-full flex-1 flex-col gap-1 overflow-y-auto p-4 md:p-0">
        {sidebarNavItems.map((item) => (
          <SidebarItem
            key={item.key}
            label={t(item.labelKey)}
            icon={item.icon}
            to={item.to}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {!collapsed && (
        <div className="flex w-full shrink-0 flex-col gap-3 px-4 pb-4 md:p-0">
          <SidebarSupport />

          <Button
            type="button"
            variant="ghost"
            color="negative"
            size={44}
            startIcon={<LogOut />}
            onClick={handleLogout}
            className="w-full justify-start rounded-xl px-2 hover:bg-negative-wash md:hidden"
          >
            {t("profileMenu.logout")}
          </Button>
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        size={28}
        iconOnly
        onClick={toggleCollapsed}
        aria-label={collapsed ? t("sidebar.expand") : t("sidebar.collapse")}
        className={cn(
          "absolute top-[29px] hidden size-[29px] rounded-xl bg-white text-ink shadow-[0px_2px_2px_0px_rgba(0,0,0,0.08),0px_0px_1px_0px_rgba(0,0,0,0.08)] hover:bg-wash md:flex",
          collapsed ? "md:-right-[6px]" : "md:right-5",
        )}
      >
        <ChevronLeft
          className={cn("transition-transform", collapsed && "rotate-180")}
        />
      </Button>
    </aside>
  );
};

export { Sidebar };
