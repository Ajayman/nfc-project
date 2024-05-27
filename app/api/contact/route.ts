import prisma from "app/lib/prisma"
import validateEmail from "../helpers/validateEmail";

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {name, email, phoneNumber, comment} = body;

    // validate email
    if(!validateEmail){
        return Response.json({
            error: "Invalid email"
        })
    }
    // create a contact in db
    await prisma.contact.create({
        data: {
            name,
            email,
            phoneNumber,
            comment
        }
    })
    // return something
    return Response.json({});
}