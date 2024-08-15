"use server"
import {cookies} from 'next/headers'

export async function getCookie(name:string){
    const cookieStore = cookies();
    const theme = cookieStore.get(name);
    return theme;
}