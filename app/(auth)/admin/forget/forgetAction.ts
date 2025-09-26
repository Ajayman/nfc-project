'use server'

import {redirect} from "next/navigation"
export default async function ForgetPassword(currentState:any, formData: FormData): Promise<string>{
    // Get the data off the form
    const email = formData.get("email");

    //send to our api route
    const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/forgetPassword", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email})
    })
    const json = await res.json();

    // Redirect to password reset page if success
    if(res.ok){
        redirect("/forget/submitpwd");
    }else{
        return json.error;
    }
}