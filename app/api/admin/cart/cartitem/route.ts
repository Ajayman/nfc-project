import prisma from "app/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request){
    const cartItem = await prisma.cartItem.create({
        data: {
            quantity: 2,
            productId: '6656fb6eb39b9ee976452550',
            cartId: '667ab3798d692a2add9953ff'
        }
    })
    console.log("cartItem", cartItem)
    return NextResponse.json({message: "DB Relation"})
}

export async function GET(request){
    console.log("fetch called");
    try{
        const cartItems = await prisma.cartItem.findMany()
        return NextResponse.json(cartItems)
    }catch(error){
        return NextResponse.json("error:"+ error)
    }
}