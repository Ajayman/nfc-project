import prisma from "app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request) {
    const cart = await prisma.cart.create({
        data: {
            userId: "667aa05a8d692a2add9953f8"
            }
        }
)
    console.log("Cart", cart)
    return NextResponse.json({ message: "DB Relation" })
}