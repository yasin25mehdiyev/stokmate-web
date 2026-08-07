import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PageContainer } from '@/shared/ui/custom/page-container'
import { Button } from '@/shared/ui/core/button'
import { ProductTable } from '@/features/products/product-table'

export default function ProductsPage() {
  const { t } = useTranslation('products')

  return (
    <PageContainer title={t('page.title')} description={t('page.description')}>
      <ProductTable
        actions={
          <Button type="button" variant="primary" color="brand" size={36} asChild>
            <Link to="/products/create">
              <Plus />
              {t('actions.add')}
            </Link>
          </Button>
        }
      />
    </PageContainer>
  )
}
