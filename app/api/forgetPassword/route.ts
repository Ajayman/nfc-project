import validateEmail from "../helpers/validateEmail"
import prisma from "app/lib/prisma"

export async function POST(request: Request){
    // Read data off req body
    const body = await request.json();
    const {email} = body;

    // validate data
    if(!validateEmail(email)){
        return Response.json({
            error: "Invalid email"
        },
        {status: 400})
    }

    //look the user
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    console.log(user)
    if(!user){
        return Response.json(
            {
                error: "Invalid email or password"
            },
            {status: 400}
        )
    }

    //respond with it
    return Response.json({user})
}