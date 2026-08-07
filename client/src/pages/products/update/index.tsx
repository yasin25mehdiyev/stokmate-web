import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useSmoothLoading } from '@/shared/hooks/use-smooth-loading'
import { PageContainer } from '@/shared/ui/custom/page-container'
import { PageSkeleton } from '@/shared/ui/custom/page-skeleton'
import { RouteProgressBar } from '@/shared/ui/custom/progress-bar'
import { useProduct } from '@/entities/products'
import { ProductForm } from '@/features/products/product-form'

export default function ProductUpdatePage() {
  const { t } = useTranslation('products')
  const { productId } = useParams({ from: '/protected-layout/products/$productId/update' })
  const { product, isLoading, error } = useProduct(Number(productId))
  const showSkeleton = useSmoothLoading(isLoading || !product)

  if (error) throw error

  if (showSkeleton || !product) {
    return (
      <PageContainer title={t('update.title')} description={t('update.description')}>
        <RouteProgressBar />
        <PageSkeleton />
      </PageContainer>
    )
  }

  return (
    <PageContainer title={t('update.title')} description={t('update.description')}>
      <ProductForm product={product} />
    </PageContainer>
  )
}
