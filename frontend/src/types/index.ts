import { object, string, number } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    description: string(),
    price: number(),
    stock: number(),
    categoryId: number(),
    supplierId: number()
})