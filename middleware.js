import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession(); //updates our cookie
    return res; //return response
    //prevent the session from expiring
    //With this we will have an active session with an active cookie
}