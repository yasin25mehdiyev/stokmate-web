import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";
import { UserAvatar } from "@/shared/ui/custom/user-avatar";
import { useGetCurrentUser } from "@/entities/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/core/dropdown-menu";
import { useProfileMenu } from "../lib/use-profile-menu";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const { open, onOpenChange, items } = useProfileMenu();
  const { response: user } = useGetCurrentUser();

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label={t("header.profileMenu")}
          className="h-11 shrink-0 gap-1.5 rounded-full pr-3 pl-1 hover:bg-wash focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <UserAvatar
            imageUrl={user?.imageUrl ?? undefined}
            name={user?.fullName ?? undefined}
          />
          <ChevronDown
            className={cn(
              "size-4 text-ink-secondary transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center gap-3 px-2 py-2">
          <UserAvatar
            imageUrl={user?.imageUrl ?? undefined}
            name={user?.fullName ?? undefined}
            className="size-10"
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
              {user?.email}
            </Typography>
          </div>
        </div>

        <DropdownMenuSeparator />

        {items.map((item) => (
          <div key={item.key}>
            {item.separatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem variant={item.variant} onSelect={item.onChange}>
              <item.icon />
              <Typography as="span" variant="span" className="text-inherit">
                {t(item.labelKey)}
              </Typography>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ProfileMenu };
