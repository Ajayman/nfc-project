'use server'
import {schema} from "./registerSchema"
import {redirect} from "next/navigation"
export type FormState = {
    message: string
}
export default async function CreateUserAction(prevState:FormState, data: FormData): Promise<FormState>{
    // console.log(formData)
    // Get the data off the form
    // const firstName = formData.get("firstName");
    // const lastName = formData.get("lastName");
    // const email = formData.get("email");
    // const age = formData.get("age");
    // const password = formData.get("password");
    const formData = Object.fromEntries(data)  //converts into regular javascript object by Object.fromEntries
    console.log(formData);
    const parsed = schema.safeParse(formData) //validation happens even in the server too
    if(!parsed.success){
        return{
            message: "Invalid Form Data"
        }
    }


    //send to our api route
    const res = await fetch(process.env.ROOT_URL + "/api/signup", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
    })

    const json = await res.json();
    // Redirect to login if success
    if(res.ok){
        redirect("/login");
    }else{
        return json.error;
    }
}