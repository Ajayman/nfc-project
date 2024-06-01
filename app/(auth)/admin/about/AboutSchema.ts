import {z} from "zod"

export const schema = z.object({
    aboutDescription: z.string().min(20),
    designerDetail: z.string().min(20),
    designerImageUrl: z.string()
})