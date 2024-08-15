import { safeParse } from "valibot";
import { DraftProductSchemas,Product,ProductSchema,ProductsSchema } from "../types"
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductData) => {
    
    try {

        const result = safeParse(DraftProductSchemas, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, result.output)
        } else {
            throw new Error('Datos no validos')
       }
        
    } catch (error) {
        console.log(error)
    }
    
    console.log('desde services',data)

}

export const getListProduct =  async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
export const getProductById =  async (id : Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (data : ProductData,id : Product['id']) => {
    try {

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString())
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
            return result.output
        } else {
            throw new Error('Hubo un error al actualizar los datos...')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id : Product['id']) => {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)

}

export const updateAvaibility = async (id: Product['id']) => {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
        console.log(id)
    } catch (error) {
        console.log(error)
    }
}