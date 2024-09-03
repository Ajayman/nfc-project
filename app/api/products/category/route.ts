import prisma from '@/app/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
    const query = request.nextUrl.searchParams.get("query");
    const res = await prisma.product.findMany({
        where: {
            category: {
                equals: query
            }
        }
    })
if (!res) {
    return Response.json({
        success: false,
        message: "Detail Data not found",
        data: null
    },
        {
            status: 404
        })
} else {
    return Response.json({
        success: true,
        message: "Data retrieve successfull",
        data: res
    }, {
        status: 200
    })
}
}