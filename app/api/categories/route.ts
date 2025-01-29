import prisma from "@app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const res = await prisma.category.findMany()
        return NextResponse.json({
            success: true,
            message: "Data retrieve Successfully",
            data: res
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
    }
}