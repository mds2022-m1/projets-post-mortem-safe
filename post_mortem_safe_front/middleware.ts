import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"

export async function middleware(request: NextRequest) {

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
        // verify the token validity
        token = await jose.jwtVerify(accessToken, key, {
            algorithms : ["HS256"],
            typ: "JWT"
        })
    }catch(e: any){
        console.log('\x1b[31merror\x1b[0m - ',e.message)
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If token expiration is less than 5 minutes, refresh the token
    if(token.payload.exp as number - Math.round(new Date().getTime() / 1000) < 300){
        try{
            // Use of fetch, because middleware is on low level, apolloClient doesn't work
            const res = await fetch(`${process.env.API_URL}/graphql`,{
                method: 'POST',
                headers :{
                   'Content-Type': 'application/json',
                   'Authorization' : `Bearer ${refreshToken}`
                },
                body: JSON.stringify({
                    query: `mutation getRefreshToken{refreshToken{accessToken refreshToken}}`,
                })
            })
            .then(stream => stream.json())
            .then(e => e.data.refreshToken)

            // Create response, affect user cookie and return it
            const nextResponse: NextResponse = new NextResponse();
            nextResponse.cookies.set('user',JSON.stringify(res));
            return nextResponse
        }catch(e){
            console.log(e)
        }
    }

}

export const config = {
    matcher: '/user/:path*',
}