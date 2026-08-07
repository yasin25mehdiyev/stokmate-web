import { z } from 'zod'
import type { TFunction } from 'i18next'

export const createProductSchema = (t: TFunction<'products'>) =>
  z.object({
    name: z.string().min(1, t('form.validation.nameRequired')),
    sku: z.string().min(1, t('form.validation.skuRequired')),
    barcode: z.string().optional(),
    categoryId: z.coerce.number(t('form.validation.categoryRequired')).min(1, t('form.validation.categoryRequired')),
    brandId: z.coerce.number(t('form.validation.brandRequired')).min(1, t('form.validation.brandRequired')),
    supplierId: z.coerce.number().optional(),
    price: z.coerce.number().min(0.01, t('form.validation.priceRequired')),
    costPrice: z.coerce.number().optional(),
    stock: z.coerce.number().min(0, t('form.validation.stockRequired')),
    minStock: z.coerce.number().optional(),
    unit: z.coerce.number(),
    status: z.coerce.number(),
    description: z.string().optional(),
  })

export type ProductFormValues = z.infer<ReturnType<typeof createProductSchema>>
export type ProductFormInput = z.input<ReturnType<typeof createProductSchema>>
