import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { getTokenWithRefresh } from "./utils/getRefreshToken";

export async function middleware(request: NextRequest, response: NextResponse) {

    //middleware for user app
    if (request.nextUrl.pathname.startsWith('/user')) {
        const cookie = request.cookies.get('user');
        //check if cookie is set
        if(!cookie){
            return NextResponse.redirect(new URL('/', request.url))
        }
        //get access and refresh token
        const { accessToken, refreshToken } = JSON.parse(cookie.value)
        
        const key = new TextEncoder().encode(process.env.JWT_SECRET)
        let token;
        try{
            const token2 = jose.jwtDecrypt
            // verify the token validity
            token = await jose.jwtVerify(accessToken, key, {
                algorithms : ["HS256"],
                typ: "JWT"
            })
        }catch(e: any){
            console.log('\x1b[31merror\x1b[0m - ',e.message)
            if(e.code && e.code === "ERR_JWT_EXPIRED"){
                return getTokenWithRefresh(refreshToken, request)
            }
            const nextResponse: NextResponse = NextResponse.redirect(request.nextUrl);
            nextResponse.cookies.delete('user')
            return nextResponse
        }

        // If token expiration is less than 5 minutes, refresh the token
        if(token.payload.exp as number - Math.round(new Date().getTime() / 1000) < 300){
            return getTokenWithRefresh(refreshToken, request)
        }
    }

    //middleware for index
    if (request.nextUrl.pathname === "/") {
        if(request.cookies.get('user')){
            console.log(request.nextUrl.href)
            return NextResponse.redirect(`${request.nextUrl.origin}/user/dashboard`)
        }
    }
}

export const config = {
    matcher: ['/','/user/:path*'],
}