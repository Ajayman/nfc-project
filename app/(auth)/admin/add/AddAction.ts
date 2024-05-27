"use server"
import { schema } from "./ProductSchema"
export type FormState = {
    message: string
}
export default async function AddAction(prevState:FormState, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data)  //converts into regular javascript object by Object.fromEntries
    const parsed = schema.safeParse(formData) //validation happens even in the server too
    if(!parsed.success){
        return{
            message: "Invalid Form Data"
        }
    }
    // return {message: "Success"}


    //send to our api route
    const res = await fetch(process.env.ROOT_URL + "/api/admin/product",{
        method: "Post",
        headers:{
            "Content-Type" : "application/json", 
        },
        body: JSON.stringify(formData)
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