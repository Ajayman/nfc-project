import {z} from "zod"

export const schema = z.object({
    name: z.string().min(2).max(30),
    imageUrl: z.string(),
    price: z.string(),
    title: z.string().min(5),
    description:z.string().min(5)
})