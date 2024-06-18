"use server"
import {schema} from "./CategorySchema"
import {redirect} from "next/navigation"

export type FormState = {
    message: string
}

export default async function AddAction(imageUrl, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data) //converts into regular javascript object by Object.fromEntries
    const mergeFormData = {...formData, imageUrl}
    const parsed = schema.safeParse(mergeFormData) //validation happens even in the server too
    console.log(mergeFormData)
    if(!parsed.success){
        return{
            message: "Invalid Form Data"
        }
    }
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
        console.log(res);
        const json = await res.json()
    }catch(error){
        return error
    }
   

    // // Redirect to login success page
    redirect("/category")
    // if(res.ok){
    //     return {message: "Submission successful"}       
    // }else{
    //     return json.error
    // }
}