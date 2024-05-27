"use server"
import { schema } from "./contactSchema"
export type FormState = {
    message: string
}
export default async function ContactAction(prevState:FormState, data: FormData): Promise<FormState>{
    const formData = Object.fromEntries(data)  //converts into regular javascript object by Object.fromEntries
    const parsed = schema.safeParse(formData) //validation happens even in the server too
    if(!parsed.success){
        return{
            message: "Invalid Form Data"
        }
    }
    // return {message: "Success"}


    //send to our api route
    const res = await fetch(process.env.ROOT_URL + "/api/contact",{
        method: "Post",
        headers:{
            "Content-Type" : "application/json", 
        },
        body: JSON.stringify(formData)
    })
    
    const json = await res.json()

    // // Redirect to login success page
    if(res.ok){
        return {message: "Submission successful"}
    }else{
        return json.error
    }
}