import validatePassword from "../helpers/validatePassword";
import validateEmail from "../helpers/validateEmail";
import prisma from "app/lib/prisma";
import bcrypt from "bcryptjs"
import * as jose from "jose"
export async function POST(request: Request){
    // Read data off req body
    const body = await request.json();
    const {email, password} = body;

    // validate data
    if(!validateEmail(email) || !validatePassword(password)){
        return Response.json(
            {error: "Invalid email or password",
        },
        {status: 400}
        )
    }
    //look the user
    const user = await prisma.user.findUnique({
        where:{
            email,
        }
    })
    if(!user){
        return Response.json(
            {
                error: "Invalid email or password"
            },
            {status: 400}
        )
    }
    //compare password
    const isCorrectPassword = bcrypt.compareSync(password, user.password)
    if(!isCorrectPassword){
        return Response.json(
            {
                error: "Invalid email or password"
            },
            {status: 400}
        )
    }
    //create jwt token
    const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
      const alg = 'HS256'
      
      const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(user.id.toString())
        .sign(secret)

    //Respond with it
    return Response.json({token:jwt, user})
}