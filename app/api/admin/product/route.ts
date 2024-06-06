import prisma from "app/lib/prisma"

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {name,imageUrl, price, title, description, category, productType} = body;

    // create a user in db
    await prisma.product.create({
        data: {
            name,
            imageUrl,
            price,
            title,
            description,
            category,
            productType
        }
    })
    // return something
    return Response.json({})
}