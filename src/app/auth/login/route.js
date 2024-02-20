import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const test = await supabase.auth.signInWithPassword({
    email,
    password,
  })
console.log('test',test)
console.log('email',email)
console.log('password',password)
  return NextResponse.redirect('https://setridnext.vercel.app/laeknar/admin', {
    status: 301,
  })
}