import { Link } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/core/button'
import { Typography } from '@/shared/ui/core/typography'

export default function ErrorBoundaryPage() {
  const { t } = useTranslation('common', { keyPrefix: 'errorBoundary' })

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-negative-wash">
        <AlertTriangle className="size-7 text-negative-600" />
      </div>
      <Typography variant="h5" as="h1" className="mt-2">
        {t('title')}
      </Typography>
      <Typography variant="p" color="secondary" className="max-w-md">
        {t('description')}
      </Typography>
      <div className="mt-4 flex items-center gap-3">
        <Button variant="outline" color="brand" asChild>
          <Link to="/dashboard">{t('home')}</Link>
        </Button>
      </div>
    </div>
  )
}
