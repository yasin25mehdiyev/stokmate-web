import type * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

const AlertDialogTrigger = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>,
) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
};

export { AlertDialogTrigger };
