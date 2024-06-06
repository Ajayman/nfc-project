import prisma from "app/lib/prisma"

export async function POST(request: Request) {
    // read data of req body
    const body = await request.json();
    const { aboutDescription, designerDetail, designerImageUrl } = body;
    const aboutData = await prisma.about.findMany()
    if(!aboutData) {
        // create a user in db
        await prisma.about.create({
            data: {
                aboutDescription,
                designerDetail,
                designerImageUrl
            }
        })
    }else{
        // return something
    return Response.json({})
    }
}