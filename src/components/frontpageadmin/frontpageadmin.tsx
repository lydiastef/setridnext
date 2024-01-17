'use client'
import './frontpageadmin.css';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
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

function Frontpage() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState(null) as [Data[] | null, (frontpage: Data[] | null) => void]

    const get = (name: string) => {
        // Check if frontpage is not null and not empty
        if (frontpage && frontpage.length > 0) {
          const filteredContent = frontpage.filter(item => item.name === name);
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
            <div className='imgandtext'>
                <h1 className='welcome-h1'>Velkomin í <span>Læknasetrið</span></h1>
                <img className='main-img' src='/main8.avif' alt='stethoscope' />
            </div>

            <div className='phoneclockcontainer'>

            <div className='iconbtn'> 
                <img className='icon2' src='/emailicon.png' alt='email icon' />
                <p>Tölvupóstur</p>
                {error && <p>{error}</p>}
                    <div>
                        <p className='info-btn2'>{get('email')}</p>
                    </div>
            </div>

                <div className='iconbtn'>
                    <img className='icon2' src='/phoneicon.png' alt='phone'/>
                    <p>Símanúmer</p>
                        {error && <p>{error}</p>}
                        <div>
                            <p className='info-btn2'>{get('Phone number')}</p>
                        </div>
                </div>

                <div className='iconbtn'>
                    <img className='icon2' src='/clockicon.png' alt='clock icon' />
                    <p>Opnunartímar</p>
                    {error && <p>{error}</p>}
                    <p className='oh'>{get('oh Monday')}</p>
                    <p className='oh'>{get('oh Friday')}</p>
                </div>
            </div>
            

        <h2>Velkomin í Læknasetrið</h2>
        <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.</p>
        
        
        <div className='midsectioncontainer'>
            <div className='midsectionbtn'>
                <div className='textandbtn'>
                <img className='icon' src='/doctorsicon.png' alt='doctor icon' />
                    <p className='info-btn2'>Læknar</p>
                    <p>Sjáðu alla lækna og annað starfsfólk sem starfar 
                    í Læknasetrinu</p>
                    <Link href='/laeknar'>
                        <button>Læknar</button>
                    </Link>
                </div>
            </div>

                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon' src='/ecgicon.png' alt='doctor icon' />
                        <p className='info-btn2'>Rannsóknir</p>
                        <p>Lestu um allar þær rannsóknir sem gerðar
                        eru í Læknasetrinu</p>
                        <Link href='/rannsoknir'>
                            <button>Rannsóknir</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='oh-container'>
                {error && <p>{error}</p>}
                    <img className='icon2' src='/clockicon.png' alt='opening hours icon' />
                    <p className='info-btn2'>Opnunartímar</p>
                    <p className='oh'>{get('oh Monday')}</p>
                    <p className='oh'>{get('oh Friday')}</p>
            </div>


        {error && <p>{error}</p>}
 
            <h2>{get('title')}</h2>
            
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
        <Footer/>

        </div>
    );
            }

    export default Frontpage;

    /*{error && <p>{error}</p>}

            <div className='oh-container'>
                <h2 className='oh-h2'>Opnunartímar</h2>
                <p className='where-p'>Mánudagar {get('oh Monday')}</p>
                <p className='where-p'>Þriðjudagar {get('oh Tuesday')}</p>
                <p className='where-p'>Miðvikudagar {get('oh Wednesday')}</p>
                <p className='where-p'>Fimmtudagar {get('oh Thursday')}</p>
                <p className='where-p'>Föstudagar {get('oh Friday')}</p>
            </div>*/
