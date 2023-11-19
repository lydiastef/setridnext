import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

const supabase = createClient<Database>(supabaseUrl, supabaseKey)
console.log('this is supabase', supabase)
console.log(supabaseUrl, supabaseKey)

export default supabase;

