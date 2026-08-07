import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/core/button'
import { Typography } from '@/shared/ui/core/typography'

export default function NotFoundPage() {
  const { t } = useTranslation('common', { keyPrefix: 'notFound' })

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <Typography variant="h2" color="brand">
        404
      </Typography>
      <Typography variant="h5" as="h1">
        {t('title')}
      </Typography>
      <Typography variant="p" color="secondary" className="max-w-md">
        {t('description')}
      </Typography>
      <div className="mt-4 flex items-center gap-3">
        <Button asChild>
          <Link to="/dashboard">{t('home')}</Link>
        </Button>
        <Button variant="outline" color="brand" asChild>
          <Link to="/products">{t('products')}</Link>
        </Button>
      </div>
    </div>
  )
}
