import type * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'

import { Button } from '@/shared/ui/core/button'

type ButtonProps = React.ComponentProps<typeof Button>

interface AlertDialogActionProps {
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: ButtonProps['variant']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

const AlertDialogAction = ({ variant = 'primary', color = 'brand', size = 44, ...props }: AlertDialogActionProps) => {
  return (
    <Button type="button" variant={variant} color={color} size={size} asChild>
      <AlertDialogPrimitive.Action data-slot="alert-dialog-action" {...props} />
    </Button>
  )
}

export { AlertDialogAction }
