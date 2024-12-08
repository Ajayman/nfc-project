import validatePassword from "../helpers/validatePassword";
import validateEmail from "../helpers/validateEmail";
import bcrypt from 'bcryptjs'
import prisma from "app/lib/prisma";
import {SignJWT} from "jose"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request){
    // Read data off req body
    const body = await request.json();
    const {email, password} = body;

    // validate data
    // if(!validateEmail(email) || !validatePassword(password)){
    //     return Response.json(
    //         {error: "Invalid email or password123",
    //     },
    //     {status: 400}
    //     )
    // }

    //look the user
    const user = await prisma.user.findUnique({where:{email}})
    if(!user){
        return NextResponse.json({error: "Invalid email or password"},{status: 401})}

    //compare password
    const isCorrectPassword = bcrypt.compareSync(password, user.password)
    if(!isCorrectPassword){
        return NextResponse.json({error: "Invalid email or password"},{status: 401})}

    //create jwt token
    const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
    const alg = 'HS256'
    const jwt = await new SignJWT({email})
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(user.id.toString())
        .sign(secret)

        
    // set token as a cookie
    // const response = NextResponse.json({message: 'Login successful'})
    // response.cookies.set("Authorization", jwt, {
    //     httpOnly: true, //only works on server
    //     expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    //     path: "/",
    //     sameSite: "strict"
    // })
    
    //Respond with it
    return NextResponse.json({token: jwt}, {status: 200})
}