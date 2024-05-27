import { z } from "zod"

export const schema = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.string().min(1).max(3),
    password: z.string().min(5).max(20)
    // confirmPassword: z.string().min(5).max(20)
})
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords donot match",
//     path: ["confirmPassword"]
// })