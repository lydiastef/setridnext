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

    const get = (name: string) => {
        // Check if frontpage is not null and not empty
        if (english && english.length > 0) {
          const filteredContent = english.filter(item => item.name === name);
          // Check if any matching content was found
          if (filteredContent.length > 0) {
            return filteredContent[0].value as string;
          } else {
            return ""; // Return an empty string if no matching content found
          }
        } else {
          return ""; // Return an empty string if frontpage is empty or null
        }
      };

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
        <img className='main-img' src='/main8.avif' alt='stethoscope' />

        <div className='phoneclockcontainer'>
            <div className='iconbtn'>
                <div className='icon-box'>
                    <img className='icon' src='/phoneicon.png' alt='phone'/>
                    <p>Phone number</p>
                    {error && <p>{error}</p>}
                    <div>
                        <p className='info-btn2'>{get('Phone number')}</p>
                    </div>
                </div>
            </div>

            <div className='iconbtn'>
            {error && <p>{error}</p>}
                <Link href='/laeknar'>
                    <div className='icon-box'>
                        <img className='icon' src='/clockicon.png' alt='opening hours icon' />
                        <p className='info-btn2'>Opening Hours</p>
                        <p className='oh'>{get('oh Monday')}</p>
                        <p className='oh'>{get('oh Friday')}</p>
                    </div>
                </Link>
            </div>
        </div>

    <h2>Welcome to Læknasetrið</h2>
    <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.</p>
    <div className='midsectioncontainer'>
        <div className='midsectionbtn'>
            <img className='icon2' src='/doctorsicon.png' alt='doctor icon' />
            <div className='textandbtn'>
                <p className='info-btn2'>Doctors</p>
                <p>See all the doctors and other staff of Læknasetrið</p>
                <Link href='/laeknar'>
                    <button>Doctors</button>
                </Link>
            </div>
        </div>

            <div className='midsectionbtn'>
                <img className='icon2' src='/ecgicon.png' alt='doctor icon' />
                <div className='textandbtn'>
                    <p className='info-btn2'>Tests</p>
                    <p>Read about all the tests performed in Læknasetrið</p>
                    <Link href='/rannsoknir'>
                        <button>Tests</button>
                    </Link>
                </div>
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