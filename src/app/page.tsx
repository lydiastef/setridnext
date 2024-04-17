'use client'
import './style.css';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Frontpage() {
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState(null) as [Data[] | null, (frontpage: Data[] | null) => void]

    const get = (name: string) => {
        // Check if frontpage is not null and not empty
        if (frontpage && frontpage.length > 0) {
          const filteredContent = frontpage.filter(item => item.name === name);
          // Check if any matching content was found
            return filteredContent.length > 0 ? filteredContent[0].value || "" : "";
          }
          return ""; // Return an empty string if frontpage is empty or null
      };

      useEffect(() => {
        const fetchFrontpage = async () => {
            const { data, error } = await supabase
                .from('frontpage')
                .select();

            if (error) {
                setFetchError('Could not fetch Where');
                console.error(error);
            } else if (data) {
                setFrontpage(data);
            }
        };

        fetchFrontpage();
    }, []);

    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            <Navbar/>
            <div className='imgandtext'>
                <img className='main-img' src='./images/setrid2.jpg' alt='stethoscope' />
            </div>

            <div className='phoneclockcontainer'>
                <div className='iconbtnall'>
                    <div className='iconbtn1'> 
                        <img className='icon2' src='./images/emailicon.png' alt='email icon' />
                        <h2 className='undericon'>Tölvupóstur</h2>
                        {error && <p>{error}</p>}
                        <div>
                            <p className='info-btn2'>{get('email')}</p>
                        </div>
                    </div>

                    <div className='iconbtn'>
                        <img className='icon2' src='./images/phoneicon.png' alt='phone'/>
                        <h2 className='undericon'>Símanúmer</h2>
                            {error && <p>{error}</p>}
                            <div className='phone-info'>
                                <p className='info-btn2'>{get('Phone number')}</p>
                                <button className='phone-oh'>
                                    <span className='phone-oh-default'>Opnunartími símans</span>
                                    <span className='phone-oh-hover-details'>
                                        <p className='phone-oh1'>{get('phone-oh1')}</p>
                                        <p className='phone-oh2'>{get('phone-oh2')}</p>
                                    </span>
                                </button>
                            </div>
                    </div>

                    <div className='iconbtn1'>
                        <img className='icon2' src='./images/clockicon.png' alt='clock icon' />
                        <h2 className='undericon'>Opnunartímar</h2>
                        {error && <p>{error}</p>}
                        <p className='info-btn2'>{get('oh Monday')}</p>
                    </div>
                </div>
            </div>
            
        <div className='main-container'>
            <h2>Velkomin í Læknasetrið</h2>
            {error && <p>{error}</p>}
            <p className='text'>{get('intro text')}</p>
        
            <div className='midsectioncontainer'>
                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon' src='./images/doctorsicon.png' alt='doctor icon' />
                        <p className='box-p'>Sjáðu alla lækna og annað starfsfólk sem starfar 
                        í Læknasetrinu</p>
                        <Link href='/laeknar'>
                            <button className='drbtn'>Læknar</button>
                        </Link>
                    </div>
                </div>

                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon3' src='./images/ecgicon.png' alt='doctor icon' />
                        <p className='box-p'>Lestu um allar þær rannsóknir sem gerðar
                        eru í Læknasetrinu</p>
                        <Link href='/rannsoknir'>
                            <button className='drbtn'>Rannsóknir</button>
                        </Link>
                    </div>
                </div>
            </div>

            {error && <p>{error}</p>}
 
            <h2 className='where-h2'>Staðsetning</h2>
            
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
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    frameBorder={0}
                    >
                </iframe>

            </div>
        </div>
        </div>
        <Footer/>

        </div>
    );
}
export default Landingpage;

    export default Frontpage;