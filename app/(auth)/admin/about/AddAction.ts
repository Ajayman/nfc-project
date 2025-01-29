"use server"
import { schema } from "./AboutSchema"
import {redirect} from "next/navigation"
export type FormState = {
    message: string
}
export default async function AddAction(aboutTitleImageUrl: string, designerImageUrl: string, ourStoryImageUrl: string, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data) //converts into regular javascript object by Object.fromEntries
    const mergeFormData = {...formData, designerImageUrl, aboutTitleImageUrl, ourStoryImageUrl}
    console.log(mergeFormData);
    const parsed = schema.safeParse(mergeFormData) //validation happens even in the server too
    // if(!parsed.success){
    //     return{
    //         message: "Invalid Form Data"
    //     }
    // }
    // return {message: "Success"}


    //send to our api route
    const res = await fetch(process.env.ROOT_URL + "/api/admin/about",{
        method: "Post",
        headers:{
            "Content-Type" : "application/json", 
        },
        body: JSON.stringify(mergeFormData)
    })
    console.log(res);
    const json = await res.json()

    // // Redirect to login success page
    if(res.ok){
        return {message: "Submission successful"}       
    }else{
        return json.error
    }
}