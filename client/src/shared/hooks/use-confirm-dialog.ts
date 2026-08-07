import { useState } from "react";

interface ConfirmDialogConfig {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface UseConfirmDialogOptions {
  onConfirm: () => void;
}

const useConfirmDialog = ({ onConfirm }: UseConfirmDialogOptions) => {
  const [open, setOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<ConfirmDialogConfig | null>(null);

  const openConfirm = (nextConfig: ConfirmDialogConfig) => {
    setConfig(nextConfig);
    setOpen(true);
  };

  return {
    openConfirm,
    dialogProps: { open, onOpenChange: setOpen, config, onConfirm },
  };
};

export { useConfirmDialog, type ConfirmDialogConfig };
