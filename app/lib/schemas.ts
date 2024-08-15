import {z} from "zod"

export const contactSchema = z.object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    phoneNumber: z.string().min(7).max(20),
    comment: z.string().min(10).max(100)
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})