import {about} from "app/products"
import { cookies, headers } from "next/headers"
import {NextResponse} from "next/server"

export async function GET(request: Request){
    return NextResponse.json(about)
}
