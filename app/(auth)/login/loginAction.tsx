'use server'

import { cookies } from "next/headers";
import {redirect} from "next/navigation"
export default async function loginUserAction(currentState:any, formData: FormData): Promise<string>{
    // Get the data off the form
    const email = formData.get("email");
    const password = formData.get("password");


    //send to our api route
    const res = await fetch(process.env.ROOT_URL + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email, password})
    })
    const json = await res.json();
    cookies().set("Authorization", json.token,{
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
        path: "/",
        sameSite: "strict" 
    })

    // Redirect to login if success
    if(res.ok){
        redirect("/");
    }else{
        return json.error;
    }
}