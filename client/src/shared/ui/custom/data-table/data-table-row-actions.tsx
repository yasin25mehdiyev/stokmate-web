import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/core/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/core/tooltip";

interface DataTableRowActionsProps<T> {
  row: T;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const DataTableRowActions = <T,>({
  row,
  onView,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-1">
      {onEdit && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size={32}
              iconOnly
              onClick={() => onEdit(row)}
              aria-label={t("dataTable.actions.edit")}
            >
              <Pencil />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("dataTable.actions.edit")}</TooltipContent>
        </Tooltip>
      )}

      {onView && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size={32}
              iconOnly
              onClick={() => onView(row)}
              aria-label={t("dataTable.actions.view")}
            >
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("dataTable.actions.view")}</TooltipContent>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              color="negative"
              size={32}
              iconOnly
              onClick={() => onDelete(row)}
              aria-label={t("dataTable.actions.delete")}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t("dataTable.actions.delete")}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export { DataTableRowActions };
