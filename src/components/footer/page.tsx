'use client'
import './style.css';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import {FooterContainer} from './style'
import Login from '../../app/login/page'

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Footer() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [footer, setFooter] = useState(null) as [Data[] | null, (footer: Data[] | null) => void]

    const get=(name:string) => {
        return footer?.filter(content => content.name === name) [0].value as string
    }

    useEffect(() => {
        const fetchFooter = async () => {
            const { data, error } = await supabase
            .from('footer') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch footer')
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
            {error && <p>{error}</p>}
            <div className='footer-container'>
                <div className='footer-container1'>
                    <p className='footer-p'>Læknasetrið ehf.</p>
                    <p className='footer1'>{get('address')}</p>
                    <p className='footer1'>{get('phone')}</p>
                    <p className='footer1'>{get('email')}</p>
                    <p className='footer1'>{get('kt')}</p>
                </div>

                {error && <p>{error}</p>}
                <div className='footer-container1'>
                <p className='footer-p'>Opnunartímar</p>
                    <p className='footer2'>{get('oh setrid')}</p>
                    <p className='footer2'>{get('oh setrid mán-fim')}</p>
                    <p className='footer1'>{get('oh setrid föstud')}</p>
                    <p className='footer2'>{get('oh blodtaka')}</p>
                    <p className='footer1'>{get('oh blodtaka mán-fös')}</p>
                    <p className='footer2'>{get('oh rontgen')}</p>
                    <p className='footer1'>{get('oh rontgen mán-fös')}</p>
                </div>

                {error && <p>{error}</p>}
                <div className='footer-container1'>
                <p className='footer-p'>Tímapantanir</p>
                    <p className='footer1'>{get('book phone')}</p>
                    <p className='footer1'>{get('book email')}</p>
                    <p className='footer1'>{get('book no show')}</p>
                    <Login/>
                </div>
            </div>
        </footer>
    )
}

export default Footer;