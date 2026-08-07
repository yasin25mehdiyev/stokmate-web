import { CalendarDays, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

import { formatToday } from "@/shared/lib/format-today";
import { Logo } from "@/shared/icons/logo";
import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";
import { LanguageSwitcher } from "@/widgets/language-switcher";
import { ProfileMenu } from "./ui/profile-menu";

interface HeaderProps {
  onOpenMobileNav: () => void;
}

const Header = ({ onOpenMobileNav }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const today = formatToday(i18n.language);

  return (
    <header className="flex h-11 w-full shrink-0 items-center justify-between gap-2">
      <Logo className="md:hidden" />

      <div className="ml-auto flex items-center gap-1 rounded-full bg-white p-1 md:hidden">
        <Button
          type="button"
          variant="ghost"
          size={36}
          iconOnly
          onClick={onOpenMobileNav}
          aria-label={t("header.openMenu")}
          className="rounded-full bg-wash hover:bg-wash"
        >
          <Menu />
        </Button>
      </div>

      <div className="ml-auto hidden items-center gap-1 rounded-full bg-white p-1 md:flex">
        <div className="hidden items-center gap-1 rounded-full bg-wash px-3 py-1 sm:flex">
          <CalendarDays className="size-4 text-secondary-brand" />
          <Typography as="span" variant="span" color="secondary-brand">
            {today}
          </Typography>
        </div>

        <LanguageSwitcher />

        <ProfileMenu />
      </div>
    </header>
  );
};

export { Header };
