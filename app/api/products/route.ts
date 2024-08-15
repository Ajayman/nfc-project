import { NextResponse } from "next/server"
import prisma from "app/lib/prisma"

export async function GET(request: Request){
    console.log("called");
    // return NextResponse.json(products)
    // read data of req body
    try {
        const allProducts = await prisma.product.findMany()
        return NextResponse.json(allProducts)
    } catch (error) {
        
    }
    
    
}