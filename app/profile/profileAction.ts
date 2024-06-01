'use server'
import {cookies} from "next/headers"
import { redirect } from "next/navigation";

export async function deleteCookies(){
    const value = cookies().delete('Authorization');
    redirect("/");
}