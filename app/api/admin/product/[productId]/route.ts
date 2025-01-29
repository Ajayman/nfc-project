import prisma from "app/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest,{params}: {params: {productId: string}}){
    // read data of req body
    const {productId} = params;
    const body = await request.json();
    const {name,imageUrl, price,discountedPrice, title, description, category, productType} = body;
    try{
    const updateProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name,
            imageUrl,
            price,
            discountedPrice,
            title,
            description,
            category,
            productType
        }
    })
    if(!updateProduct){
        return NextResponse.json({error: "Failed to update product"})
    }
    return NextResponse.json({
        success: true,
        message: "Product Updated Successfully",
        data: updateProduct
    },{
        status: 200
    })
}catch(error){
    return NextResponse.json({error})
}
}