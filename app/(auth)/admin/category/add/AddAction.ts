"use server"
import { revalidatePath } from "next/cache"
import {schema} from "./CategorySchema"
import {redirect} from "next/navigation"

export type FormState = {
    message: string
}

export default async function AddAction(imageUrl:string, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data) //converts into regular javascript object by Object.fromEntries
    const mergeFormData = {...formData, imageUrl}
    const parsed = schema.safeParse(mergeFormData) //validation happens even in the server too
    // if(!parsed.success){
    //     return{
    //         message: "Invalid Form Data"
    //     }
    // }
    // return {message: "Success"}
    //send to our api route
    try{
        const res = await fetch(process.env.ROOT_URL + "/api/admin/category",{
            method: "Post",
            headers:{
                "Content-Type" : "application/json", 
            },
            body: JSON.stringify(mergeFormData)
        })
        const json = await res.json()
    }catch(error){
        return {message: error}
    }
   

    // // Redirect to login success page
    revalidatePath(`/admin/category/add`)
    redirect("/admin/category")
    // if(res.ok){
    //     return {message: "Submission successful"}       
    // }else{
    //     return json.error
    // }
}