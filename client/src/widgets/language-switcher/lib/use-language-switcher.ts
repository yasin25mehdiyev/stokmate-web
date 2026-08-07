import { useState, type ComponentType } from "react";
import { useTranslation } from "react-i18next";

import { FlagGb, FlagRu, FlagTr } from "@/shared/icons/flags";

type LanguageCode = "tr" | "en" | "ru";

interface Language {
  code: LanguageCode;
  label: string;
  Flag: ComponentType<{ className?: string }>;
}

const LANGUAGES: Language[] = [
  { code: "tr", label: "Türkçe", Flag: FlagTr },
  { code: "en", label: "English", Flag: FlagGb },
  { code: "ru", label: "Русский", Flag: FlagRu },
];

const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const currentLanguage =
    LANGUAGES.find((language) => language.code === i18n.language) ??
    LANGUAGES[0];

  const handleSelect = (code: LanguageCode) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  return {
    languages: LANGUAGES,
    currentLanguage,
    open,
    onOpenChange: setOpen,
    handleSelect,
  };
};

export { useLanguageSwitcher, type Language, type LanguageCode };
