'use client'
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';


/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function English() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [english, setEnglish] = useState(null) as [Data[] | null, (english: Data[] | null) => void]

    const get=(name:string) => {
        return english?.filter(content => content.name === name) [0].value as string
    }

    useEffect(() => {
        const fetchEnglish = async () => {
            const { data, error } = await supabase
            .from('english') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setEnglish(null)
                console.log(error)
            }
            if (data) {
                setEnglish(data)
                setFetchError("")
            }
        }

        fetchEnglish();
    }, [])

    //Fetching data from Supabase - end

    console.log(english)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            <Navbar/>
            <h1 className='welcome-h1'>Welcome to<br/> <span>Læknasetrið</span></h1>
            <img className='main-img' src='/main.jpg' alt='stethoscope' />

            <div className='info-box'>
                <div className='iconbtn'>
                    <img className='icon' src='/icondoctors.svg' alt='doctor icon' />
                    <Link href='/laeknar'>
                        <div>
                            <div className='info-btn2'>Doctors</div>
                        </div>
                    </Link>
                </div>
                <div className='phone'>
                    <img className='icon' src='/iconphone.svg' alt='phone'/>
                    {error && <p>{error}</p>}
                        <div>
                            <h2 className='phonenumber'>{get('Phone number')}</h2>
                        </div>

                </div>
                <div className='iconbtn'>
                    <img className='icon' src='/iconheart2.svg' alt='doctor icon' />
                    <Link href='/rannsoknir'>
                        <div>
                            <div className='info-btn2'>Tests</div>
                        </div>
                    </Link>
                </div>
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

                <iframe
                    className='where-img1'
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.1994490448126!2d${get('longitude')}!3d${get('latitude')}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d6736832b01681%3A0xad9986d263da471d!2zTMOma25hc2V0cmnDsA!5e0!3m2!1sen!2sis!4v1699990097702!5m2!1sen!2sis`}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    frameBorder={0}
                    >
                </iframe>

            </div>
        </div>

            {error && <p>{error}</p>}

            <div className='oh-container'>
                <h2 className='oh-h2'>Opening Hours</h2>
                <p className='where-p'>Monday {get('oh Monday')}</p>
                <p className='where-p'>Tuesday {get('oh Tuesday')}</p>
                <p className='where-p'>Wednesday {get('oh Wednesday')}</p>
                <p className='where-p'>Thursday {get('oh Thursday')}</p>
                <p className='where-p'>Friday {get('oh Friday')}</p>
            </div>


        <Footer/>

        </div>
    );
            }

    export default English;