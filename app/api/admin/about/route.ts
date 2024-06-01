import prisma from "app/lib/prisma"

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {aboutDescription,designerDetail, designerImageUrl} = body;

    // create a user in db
    await prisma.about.create({
        data: {
            aboutDescription,
            designerDetail,
            designerImageUrl
        }
    })
    // return something
    return Response.json({})
}