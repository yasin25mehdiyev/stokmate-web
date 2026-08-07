import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/core/alert-dialog";
import type { ConfirmDialogConfig } from "@/shared/hooks/use-confirm-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: ConfirmDialogConfig | null;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  config,
  onConfirm,
}: ConfirmDialogProps) => {
  const { t } = useTranslation();

  if (!config) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{config.title}</AlertDialogTitle>
          {config.description && (
            <AlertDialogDescription>
              {config.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {config.cancelLabel ?? t("confirmDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction color="negative" onClick={onConfirm}>
            {config.confirmLabel ?? t("confirmDialog.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ConfirmDialog };
