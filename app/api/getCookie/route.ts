import {cookies} from 'next/headers'
import { NextRequest } from 'next/server';
export async function GET(request: NextRequest){
    const cookieStore = request.cookies.get('Authorization')
    return Response.json(cookieStore)
}