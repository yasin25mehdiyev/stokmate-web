import { useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useSmoothLoading } from '@/shared/hooks/use-smooth-loading'
import { PageContainer } from '@/shared/ui/custom/page-container'
import { PageSkeleton } from '@/shared/ui/custom/page-skeleton'
import { RouteProgressBar } from '@/shared/ui/custom/progress-bar'
import { useProduct } from '@/entities/products'
import { ProductView } from '@/features/products/product-view'

export default function ProductViewPage() {
  const { t } = useTranslation('products')
  const { productId } = useParams({ from: '/protected-layout/products/$productId' })
  const { product, isLoading, error } = useProduct(+productId)
  const showSkeleton = useSmoothLoading(isLoading || !product)

  if (error) throw error

  if (showSkeleton || !product) {
    return (
      <PageContainer title={t('view.title')} description={t('view.description')}>
        <RouteProgressBar />
        <PageSkeleton />
      </PageContainer>
    )
  }

  return (
    <PageContainer title={t('view.title')} description={t('view.description')}>
      <ProductView product={product} />
    </PageContainer>
  )
}
