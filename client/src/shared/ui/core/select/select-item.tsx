import type * as React from "react";
import { Check } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";

const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg py-1 pr-8 pl-3 text-sm leading-5 tracking-[0.25px] text-ink outline-none transition-colors select-none data-[highlighted]:bg-wash data-[highlighted]:text-brand-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="block truncate">
        {children}
      </SelectPrimitive.ItemText>
      <span className="absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4 text-brand-500" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
};

export { SelectItem };
