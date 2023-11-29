'use client'
import './style.css';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';


/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Frontpage() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState(null) as [Data[] | null, (frontpage: Data[] | null) => void]

    const get=(name:string) => {
        return frontpage?.filter(content => content.name === name) [0].value as string
    }

    useEffect(() => {
        const fetchFrontpage = async () => {
            const { data, error } = await supabase
            .from('frontpage') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setFrontpage(null)
                console.log(error)
            }
            if (data) {
                setFrontpage(data)
                setFetchError("")
            }
        }

        fetchFrontpage();
    }, [])

    //Fetching data from Supabase - end

    console.log(frontpage)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            <Navbar/>
            <img className='main-img' src='/main.avif' alt='stethoscope' />

            <div className='info-box'>
            <Link href='/laeknar'>
                <div>
                    <button className='info-btn1'>Læknar</button>
                </div>
            </Link>
            <div className='phone'>
                <img className='phone-img' src='/phone-icon.png' alt='phone'/>
                
                {error && <p>{error}</p>}
                        <div>
                            <h2>{get('Phone number')}</h2>
                        </div>

            </div>
            <Link href='/rannsoknir'>
              <div>
                <button className='info-btn2'>Rannsóknir</button>
              </div>
            </Link>
        </div>


        {error && <p>{error}</p>}
 
            <h2 className='where-h2'>{get('title')}</h2>
            
        <div className='where'>
            <div className='where1'>
                {error && <p>{error}</p>}

                    <div className='instructions'>
                        <p className='where-p'>{get('left text')}</p>
                    </div>

            {error && <p>{error}</p>}
            <img src={get('left image')} className='where-img'></img>
            </div>

            <div className='where1'>
                {error && <p>{error}</p>}

                <div className='instructions1'>
                    <p className='where-p'>{get('right text')}</p>
                </div>

                <iframe className='where-img1'
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.1994490448126!2d${get('longitude')}!3d${get('latitude')}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d6736832b01681%3A0xad9986d263da471d!2zTMOma25hc2V0cmnDsA!5e0!3m2!1sen!2sis!4v1699990097702!5m2!1sen!2sis`} 
                    style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

            {error && <p>{error}</p>}

            <div className='instructions'>
                <h2 className='where-h2'>Opnunartímar</h2>
                <p className='where-p'>Mánudagar {get('oh Monday')}</p>
                <p className='where-p'>Þriðjudagar {get('oh Tuesday')}</p>
                <p className='where-p'>Miðvikudagar {get('oh Wednesday')}</p>
                <p className='where-p'>Fimmtudagar {get('oh Thursday')}</p>
                <p className='where-p'>Föstudagar {get('oh Friday')}</p>
                <p className='where-p'>Laugadagar {get('oh Saturday')}</p>
                <p className='where-p'>Sunnudagar {get('oh Sunday')}</p>
            </div>


        <Footer/>

        </div>
    );
            }

    export default Frontpage;
