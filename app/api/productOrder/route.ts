import prisma from "app/lib/prisma"
// import validateEmail from "../helpers/validateEmail"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const body = await request.json();
    const {productId,fullName, email, phoneNumber, fullAddress, message} = body;
    const res = await prisma.orderProduct.create({
        data: {
            productId,
            fullName,
            email,
            phoneNumber,
            fullAddress,
            message
        }
    })
    return Response.json({res})
}