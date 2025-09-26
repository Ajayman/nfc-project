import bcrypt from 'bcryptjs'
import prisma from "app/lib/prisma";
import { SignJWT } from "jose"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    const adminUser = await prisma.adminUser.findUnique({ where: {username} })
    if (!adminUser) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const isCorrectPassword = bcrypt.compareSync(password, adminUser.password)
    if (!isCorrectPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
    const alg = 'HS256'
    const jwt = await new SignJWT({ username })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(adminUser.id.toString())
        .sign(secret)

        return NextResponse.json({token: jwt}, {status: 200})
}