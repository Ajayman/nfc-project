"use server"
import { schema } from "../../../../schemas/ProductSchema"
import {redirect} from "next/navigation"
import { revalidatePath } from 'next/cache'
export type FormState = {
    message: string
}
export default async function AddAction(imageUrl, data: FormData): Promise<FormState>{
    console.log("This is a data", data);
    const formData = Object.fromEntries(data) //converts into regular javascript object by Object.fromEntries
    const mergeFormData = {...formData, imageUrl}
    const parsed = schema.safeParse(mergeFormData) //validation happens even in the server too
    // if(!parsed.success){
    //     return{
    //         message: "Invalid Form Data"
    //     }
    // }
    //send to our api route
    try{
        const res = await fetch(process.env.ROOT_URL + "/api/admin/product",{
            method: "Post",
            headers:{
                "Content-Type" : "application/json", 
            },
            body: JSON.stringify(mergeFormData)
        })
        const json = await res.json()
    }catch(error){
        console.log(error);
    }
    revalidatePath(`/admin/add`); // Update cached posts
    redirect(`/products/`);
}