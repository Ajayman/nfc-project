import {z} from "zod"

export const schema = z.object({
    name: z.string().min(2).max(30),
    imageUrl: z.array(z.string()),
    price: z.string(),
    discountedPrice: z.string(),
    title: z.string().min(5),
    shortDescription:z.string().min(5),
    longDescription: z.string().default("Long Description"),
    category: z.string(),
    productType: z.string()
})