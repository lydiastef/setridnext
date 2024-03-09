import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin+'/laeknar/admin')
}

/*
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  await supabase.auth.signInWithPassword({
    email,
    password,
  })

  await supabase.auth.signOut()

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })

  supabase.auth.signUp({
    email: 'lydiadoula@gmail.com',
    password: '123456',
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  })
  
}

/*import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({cookies: () => cookieStore})
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)*/
    
    /*We receive a code, create a cookiestore, create routehandlerclient, pass in the function that returns 
    our cookiestore and use supabase helper to exchange code for cookies. 
    Basically setting Supabase up to use cookies.*/
//}