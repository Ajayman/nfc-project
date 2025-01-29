import prisma from "@app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, {params}:{params: {catId: string}}){
    const {catId} = params;
    const body = await request.json();
    const {name, imageUrl} = body;
    try{
        const updateCategory = await prisma.category.update({
            where: {
                id: catId
            },
            data: {
                name, imageUrl
            }
        })
        if(!updateCategory){
            return NextResponse.json({error: "Failed to update category"})
        }
        return NextResponse.json({
            success: true,
            message:"Category updated Successfully",
            data: updateCategory
        },
    {
        status: 200
    })
    }catch(error){
        return NextResponse.json({error})
    }
}