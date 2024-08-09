// // export const GET = async(req)=>{
// //     console.log("Request"+req)
// // }
import { NextRequest, NextResponse } from "next/server" 
import prisma from "app/lib/prisma"
export async function GET(request: NextRequest, response: NextResponse) {
    const query:any = request.nextUrl.searchParams.get("query");
    // const query = request.method
    // console.log(query);
    const res = await prisma.product.findMany({
        where: {
            name: {
                contains: query
            }
        }
    });
    if (!res) {
        return Response.json({
            success: true,
            message: "Detail Data Note Not Found",
            data: null
        },
            {
                status: 404
            })
    }else{
        return Response.json({
            success: true,
            message: "Data retrieve successfull",
            data: res
        },{
            status: 200
        })
    }
}