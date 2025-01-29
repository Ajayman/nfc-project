import prisma from "app/lib/prisma"

export async function POST(request: Request) {
    // read data of req body
    const body = await request.json();
    console.log(body);
    const { aboutDescription, aboutTitleImageUrl, designerDetail, designerImageUrl, ourStoryDescription, ourStoryImageUrl } = body;
    // const aboutData = await prisma.about.findMany()
    // create a user in db
    const result = await prisma.about.create({
        data: {
            aboutDescription,
            aboutTitleImageUrl,
            designerDetail,
            designerImageUrl,
            ourStoryDescription,
            ourStoryImageUrl
        }
    })
    console.log(result);
    return Response.json({ result })
}