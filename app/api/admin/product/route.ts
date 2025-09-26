import prisma from "app/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    // read data of req body
    const body = await request.json();
    const {name,imageUrl, price,discountedPrice, title, shortDescription, longDescription, category, productType} = body;

    // create a user in db
    try{
    const res = await prisma.product.create({
        data: {
            name,
            imageUrl,
            price,
            discountedPrice,
            title,
            shortDescription,
            longDescription,
            category,
            productType
        }
    })

    // return something
    console.log(res);
    if(!res){
        return NextResponse.json({error: "Failed to create product"});
    }
    return NextResponse.json({
        success: true,
        message: "Product Created Successfully",
        data: res
    },{
        status: 201
    })
}catch(error){
    console.log(error)
}
}

