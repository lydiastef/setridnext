import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
console.log('this is supabase', supabase)
console.log(supabaseUrl, supabaseKey)

export default supabase;
/*
export default async (req, res) => {
    try {
        //Fetch data from Supabase
        const { data, error } = await supabase
            .from('where')
            .select()
            .single();
        
        if (error) {
            return res.status(500).json({ error: Could not fetch content });
        }

        return res.status(200).json(data);
    }   catch (error) {
        return res.status(500).json({ error: Server error });
    }
};
