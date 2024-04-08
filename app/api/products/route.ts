import {products} from "app/products"
import { NextResponse } from "next/server"

export async function GET(request: Request){
    return NextResponse.json(products)
}

export async function POST(request: Request){
    const data = await request.json()
    return NextResponse.json({
        data
    })
}