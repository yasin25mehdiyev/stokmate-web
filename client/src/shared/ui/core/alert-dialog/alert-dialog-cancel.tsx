import type * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'

import { Button } from '@/shared/ui/core/button'

type ButtonProps = React.ComponentProps<typeof Button>

interface AlertDialogCancelProps {
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: ButtonProps['variant']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

const AlertDialogCancel = ({ variant = 'outline', color = 'brand', size = 44, ...props }: AlertDialogCancelProps) => {
  return (
    <Button type="button" variant={variant} color={color} size={size} asChild>
      <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" {...props} />
    </Button>
  )
}

export { AlertDialogCancel }
