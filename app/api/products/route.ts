import { NextResponse } from "next/server"
import prisma from "app/lib/prisma"

export async function GET(request: Request) {
    // return NextResponse.json(products)
    // read data of req body
    const allProducts = await prisma.product.findMany()
    return NextResponse.json(allProducts)


}