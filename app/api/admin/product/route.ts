import prisma from "app/lib/prisma"

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {name, image, price, title, description} = body;

    // create a user in db
    await prisma.product.create({
        data: {
            name,
            image,
            price,
            title,
            description
        }
    })
    // return something
    return Response.json({})
}