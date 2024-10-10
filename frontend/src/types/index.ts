import { object, string, number, InferOutput, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    description: string(),
    price: number(),
    stock: number(),
    categoryId: number(),
    supplierId: number()
})

export const ProductSchema = object({
    productId: number(),
    name: string(),
    description: string(),
    price: number(),
    stock: number(),
    categoryId: number(),
    supplierId: number()
})

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>