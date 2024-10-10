    import { safeParse } from 'valibot'
    import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types"
    import axios from 'axios'
    
    type ProductData = {
        [k: string]: FormDataEntryValue;
    }
    
    export async function addProduct(data : ProductData) {
        try {
            const result = safeParse(DraftProductSchema, {
                name: data.name,
                description: data.description,
                price: +data.price,
                stock: +data.stock,
                categoryId: +data.categoryId,
                supplierId: +data.supplierId
            })
            if(result.success) {
                const url = `${import.meta.env.VITE_API_URL}/api/create-product`
                const { data } = await axios.post(url, {
                    name: result.output.name,
                    description: result.output.description,
                    price: result.output.price,
                    stock: result.output.stock,
                    categoryId: result.output.categoryId,
                    supplierId: result.output.supplierId
                })
            } else {
                throw new Error('Datos no válidos')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    export async function getProducts() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/products`            
            const { data } = await axios(url)
            console.log(data);
            const result = safeParse(ProductsSchema, data.data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }