import prisma from "@app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {catId: string}}){
    const {catId} = params;
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: catId
            }
        })
        if(!category){
            return NextResponse.json({error: 'Failed to fetch Detail Data'})
        }
        return NextResponse.json({
            success: true,
            message: "Data retrieve successfully",
            data: category
        }, {
            status: 200
        })
    }catch(error){
        NextResponse.json(error)
    }
}