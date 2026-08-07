import { useTranslation } from 'react-i18next'

import { Typography } from '@/shared/ui/core/typography'
import { useGetCurrentUser } from '@/entities/profile'
import { ProductStats } from '@/widgets/product-stats'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { response: user } = useGetCurrentUser()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Typography variant="h4" as="h1">
          {t('sidebar.dashboard')}
        </Typography>
        {user?.fullName && (
          <Typography variant="p" color="secondary">
            {t('greeting', { ns: 'dashboard', name: user.fullName })}
          </Typography>
        )}
      </div>

      <ProductStats />
    </div>
  )
}
