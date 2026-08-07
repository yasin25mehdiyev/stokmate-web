import { useState } from "react";
import { LogOut, type LucideIcon } from "lucide-react";

import type { TranslationKey } from "@/shared/i18n/types";
import { useLogout } from "@/features/auth/logout";

interface ProfileMenuItem {
  key: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  separatorBefore?: boolean;
  onChange?: () => void;
}

const useProfileMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { handleLogout } = useLogout();

  const items: ProfileMenuItem[] = [
    {
      key: "logout",
      labelKey: "profileMenu.logout",
      icon: LogOut,
      variant: "destructive",
      onChange: handleLogout,
    },
  ];

  return { open, onOpenChange: setOpen, items };
};

export { useProfileMenu, type ProfileMenuItem };
