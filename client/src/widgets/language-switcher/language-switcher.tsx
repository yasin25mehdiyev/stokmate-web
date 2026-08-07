import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/core/button";
import { Typography } from "@/shared/ui/core/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/core/dropdown-menu";
import { useLanguageSwitcher } from "./lib/use-language-switcher";

const FlagBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-outline">
      {children}
    </span>
  );
};

const LanguageSwitcher = () => {
  const { languages, currentLanguage, open, onOpenChange, handleSelect } =
    useLanguageSwitcher();

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-11 shrink-0 gap-1.5 rounded-full pr-3 pl-1.5 hover:bg-wash focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <FlagBadge>
            <currentLanguage.Flag />
          </FlagBadge>
          <Typography as="span" variant="span" className="font-medium text-ink">
            {currentLanguage.code.toUpperCase()}
          </Typography>
          <ChevronDown
            className={cn(
              "size-4 text-ink-secondary transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[190px]">
        {languages.map((language) => {
          const isSelected = language.code === currentLanguage.code;

          return (
            <DropdownMenuItem
              key={language.code}
              onSelect={() => handleSelect(language.code)}
              className={cn(
                isSelected &&
                  "bg-brand-100/30 text-brand-500 data-[highlighted]:bg-brand-100/40",
              )}
            >
              <FlagBadge>
                <language.Flag />
              </FlagBadge>
              <Typography
                as="span"
                variant="span"
                className={cn(
                  "flex-1 text-inherit",
                  isSelected && "font-medium",
                )}
              >
                {language.label}
              </Typography>
              {isSelected && (
                <Check className="size-4 shrink-0 text-brand-500" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageSwitcher };
