import validateEmail from "../helpers/validateEmail";
import validatePassword from "../helpers/validatePassword";
import prisma from "app/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    // read data of req body
    const body = await request.json();
    const {email, password} = body;


    // validate data
    if(!validateEmail(email) || !validatePassword(password)){
        return Response.json({
            error: "Invalid email or password",
        },
        {status: 400}
        )
    }
    // hash the password
    var hash = bcrypt.hashSync(password, 8)

    // create a user in db
    await prisma.user.create({
        data: {
            email, 
            password: hash
        }
    })
    // return something
    return Response.json({});
}