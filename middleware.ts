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
  console.log(process.env.JWT_TOKEN)
  //validate it
  const secret = new TextEncoder().encode(process.env.JWT_TOKEN)
  const jwt = cookie.value;
  if(!jwt){
    return NextResponse.redirect(new URL('/', request.url))
  }else{
    const { payload } = await jose.jwtVerify(jwt, secret,{})
    console.log(payload)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}

