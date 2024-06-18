"use server"
import { schema } from "./ProductSchema"
import {redirect} from "next/navigation"
import { revalidatePath } from 'next/cache'
export type FormState = {
    message: string
}
export default async function AddAction(imageUrl, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data) //converts into regular javascript object by Object.fromEntries
    console.log(formData);
    const mergeFormData = {...formData, imageUrl:imageUrl}
    console.log(mergeFormData);
    const parsed = schema.safeParse(mergeFormData) //validation happens even in the server too
    if(!parsed.success){
        return{
            message: "Invalid Form Data"
        }
    }
    // return {message: "Success"}


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
        return error
    }
    revalidatePath(`/admin/add`); // Update cached posts
    redirect(`/products/`);
    // // Redirect to login success page
    // if(res.ok){
    //     return {message: "Submission successful"}       
    // }else{
    //     return json.error
    // }
}