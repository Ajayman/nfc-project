import prisma from "app/lib/prisma"

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {name,imageUrl} = body;

    // create a user in db
    await prisma.category.create({
        data: {
            name,
            imageUrl,
        }
    })
    // return something
    return Response.json({})
}