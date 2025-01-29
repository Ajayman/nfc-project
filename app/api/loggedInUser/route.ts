import { cookies } from 'next/headers';
import prisma from '@app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'
export async function GET(request: NextRequest) {
    console.log("funciton called")
    const token = cookies().get("Authorization")?.value;
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
        const { payload } = await jwtVerify(token, secret)
        const user = await prisma.user.findUnique({
            where: { email: payload.email }
        })
        return NextResponse.json({ user })
    }
    catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    // if (!user) {
    //     return Response.json({ error: 'User not found' }, { status: 404 });
    // }
    // return Response.json({ user });


}