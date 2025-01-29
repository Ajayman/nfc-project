import {z} from "zod"

export const schema = z.object({
    aboutDescription: z.string().min(20),
    aboutTitleImageUrl: z.string(),
    designerDetail: z.string().min(20),
    designerImageUrl: z.string(),
    ourStoryDescription: z.string().min(20),
    ourStoryImageUrl: z.string()
}) 