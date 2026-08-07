import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/core/input";

interface DataTableToolbarProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
}

const DataTableToolbar = ({
  searchValue,
  searchPlaceholder,
  onSearchChange,
  filters,
  actions,
}: DataTableToolbarProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {onSearchChange && (
        <Input
          startIcon={<Search />}
          placeholder={searchPlaceholder ?? t("dataTable.search")}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          className="max-w-72 bg-white"
        />
      )}
      {filters}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
};

export { DataTableToolbar };
