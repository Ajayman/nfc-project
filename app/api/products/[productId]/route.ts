import { NextRequest, NextResponse } from "next/server";
import prisma from "app/lib/prisma"

export async function GET(request: NextRequest, { params}:{ params: { productId: string } }) {
    const { productId } = params;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product) {
            return NextResponse.json({ error: 'Failed to fetch Detail Data' })
        }
        return NextResponse.json({
            success: true,
            message: "Data retrieve successfull",
            data: product
        }, {
            status: 200
        });
    } catch (error) {
        console.log(error);
    }
}