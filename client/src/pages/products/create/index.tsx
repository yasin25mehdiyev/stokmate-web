import { useTranslation } from 'react-i18next'

import { PageContainer } from '@/shared/ui/custom/page-container'
import { ProductForm } from '@/features/products/product-form'

export default function ProductCreatePage() {
  const { t } = useTranslation('products')

  return (
    <PageContainer title={t('create.title')} description={t('create.description')}>
      <ProductForm />
    </PageContainer>
  )
}
