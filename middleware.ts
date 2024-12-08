import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //check for cookie
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  // return NextResponse.next();
  //validate it
  const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
  const jwt = cookie.value;
  try{
    const { payload } = await jose.jwtVerify(jwt, secret,{})
    console.log(payload) 
    // return NextResponse.redirect(new URL('/', request.url))
  }catch(error){
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/profile'],
}

// import NextAuth from "next-auth";
// import { authConfig } from "auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ['/admin/:path*', '/profile']
// }