import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'
//import NextAuth from 'next-auth';
//import { authConfig } from './auth.config'

export async function middleware(req:NextRequest){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res}); //request and response
    await supabase.auth.getSession(); //updates our cookie
    return res; //return response
    //prevent the session from expiring
    //With this we will have an active session with an active cookie
}

//export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

/*Here I'm initializing NextAuth.js with the authConfig object and exporting the auth property. 
I'm using the matcher option from Middleware to specify that it should run on specific paths.

The advantage of employing Middleware for this task is that the protected routes will not even start 
rendering until the Middleware verifies the authentication, enhancing both the security and 
performance of the application.*/