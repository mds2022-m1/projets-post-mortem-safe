import { NextRequest, NextResponse } from "next/server";

// get new access and refresh token and push them to user cookie
export const getTokenWithRefresh= async (token: string, request: NextRequest): Promise<NextResponse> => {
    try{
        // Use of fetch, because middleware is on low level, apolloClient doesn't work
        const res = await fetch(process.env.NEXT_PUBLIC_API_GRAPHQL as string,{
            method: 'POST',
            headers :{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({
                query: `mutation getTokenWithRefresh{refreshToken{accessToken refreshToken}}`,
            })
        })
        .then(stream => stream.json())

        if(res.errors){
            console.log(`\x1b[31merror\x1b[0m - ${res.errors[0].extensions.response.statusCode} :`, res.errors[0].message)   
            const nextResponse: NextResponse = NextResponse.redirect(request.nextUrl);
            nextResponse.cookies.delete('user')
            return nextResponse
        }

        const nextResponse: NextResponse =  NextResponse.next();
        nextResponse.cookies.set('user',JSON.stringify(res.data.refreshToken));
        return nextResponse
    }catch(e){
        console.log(e)
        const nextResponse: NextResponse = NextResponse.redirect(request.nextUrl);
        nextResponse.cookies.delete('user')
        return nextResponse
    }
}