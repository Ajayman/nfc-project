import prisma from "@app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, response: NextResponse, {params}:{params: {catId: string}}){
    const {catId} = params;
    try {
        const resultCategory = await prisma.category.delete({
            where: {
                id: catId
            }
        })
        if(resultCategory){
            return NextResponse.json({message: `deleted Category ${catId}`})
        }
        return NextResponse.json({message: "Cannot Delete Category ${catId}" })
    }catch(err){
        console.error(`Error deleting category `, err)
    }
}