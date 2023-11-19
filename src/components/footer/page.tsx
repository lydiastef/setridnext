'use client'
import './style.css';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'

type Data = {
    created_at: string;
    id: number;
    column_1: string | null;
    column_2: string | null;
    column_3: string | null;
}

function Footer() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [footer, setFooter] = useState(null) as [Data[] | null, (footer: Data[] | null) => void]

    useEffect(() => {
        const fetchFooter = async () => {
            const { data, error } = await supabase
            .from('footer') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setFooter(null)
                console.log(error)
            }
            if (data) {
                setFooter(data)
                setFetchError("")
            }
        }

        fetchFooter();
    }, [])

    //Fetching data from Supabase - end

    console.log(footer)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <footer>
            <div className='footercontainer'>
                    
                {error && <p>{error}</p>}
                    {footer && footer[0]?.column_1 && (
                        <div className='something1'>
                            <p>{footer[0].column_1}</p>
                        </div>
                    )}

                {error && <p>{error}</p>}
                    {footer && footer[0]?.column_2 && (
                        <div className='something2'>
                            <p>{footer[0].column_2}</p>
                        </div>
                    )}

                {error && <p>{error}</p>}
                    {footer && footer[0]?.column_3 && (
                        <div className='something3'>
                            <p>{footer[0].column_3}</p>
                        </div>
                    )}
            </div>
        </footer>
    )
}

export default Footer;