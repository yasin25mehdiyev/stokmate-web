import type * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

const AlertDialog = (
  props: React.ComponentProps<typeof AlertDialogPrimitive.Root>,
) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
};

export { AlertDialog };
