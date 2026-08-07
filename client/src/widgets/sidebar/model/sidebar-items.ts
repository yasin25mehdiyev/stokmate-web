import { PieChart, Package, type LucideIcon } from 'lucide-react'

import type { TranslationKey } from '@/shared/i18n/types'

interface SidebarNavItemConfig {
  key: string
  labelKey: TranslationKey
  icon: LucideIcon
  to?: string
}

const sidebarNavItems: SidebarNavItemConfig[] = [
  { key: 'dashboard', labelKey: 'sidebar.dashboard', icon: PieChart, to: '/dashboard' },
  { key: 'products', labelKey: 'sidebar.products', icon: Package, to: '/products' },
]

export { sidebarNavItems, type SidebarNavItemConfig }
