import {z} from "zod"

export const schema = z.object({
    name: z.string().min(2).max(30),
    email: z.string().email(),
    phoneNumber: z.string().min(7).max(20),
    comment: z.string().min(20).max(100)
})