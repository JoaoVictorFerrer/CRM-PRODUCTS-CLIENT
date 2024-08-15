import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchemas = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema) // el esquema para toda la lista

//generamos el type con el schema 
export type Product = InferOutput<typeof ProductSchema >