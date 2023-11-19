'use client'
import './style.css';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import WhereImage from '../../public/Where.png';

/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    where_text: string | null;
    where_title: string | null;
    phone: string | null;
    maps_text: string | null;
    opening_hours: string | null;
    opening_hours_title: string | null;
}

function Landingpage() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [landingpage, setLandingpage] = useState(null) as [Data[] | null, (landingpage: Data[] | null) => void]

    useEffect(() => {
        const fetchLandingpage = async () => {
            const { data, error } = await supabase
            .from('landingpage') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setLandingpage(null)
                console.log(error)
            }
            if (data) {
                setLandingpage(data)
                setFetchError("")
            }
        }

        fetchLandingpage();
    }, [])

    //Fetching data from Supabase - end

    console.log(landingpage)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            <Navbar/>
            <img className='main-img' src='/reykjavik.avif' alt='stethoscope' />

            <div className='info-box'>
            <Link href='/laeknar'>
                <div>
                    <button className='info-btn1'>Læknar</button>
                </div>
            </Link>
            <div className='phone'>
                <img className='phone-img' src='/phone-icon.png' alt='phone'/>
                
                {error && <p>{error}</p>}
                    {landingpage && landingpage[0]?.phone && (
                        <div>
                            <h2>{landingpage[0].phone}</h2>
                        </div>
                    )}

            </div>
            <Link href='/rannsoknir'>
              <div>
                <button className='info-btn2'>Rannsóknir</button>
              </div>
            </Link>
        </div>


        {error && <p>{error}</p>}
        {landingpage && (
            <h2 className='where-h2'>{landingpage[0].where_title}</h2>
        )}
            
        <div className='where'>
            <div className='where1'>
                {error && <p>{error}</p>}
                {landingpage && (
                    <div className='instructions'>
                        <p className='where-p'>{landingpage[0].where_text}</p>
                    </div>
                )}
            
            <img className='where-img' src='/Where.png' alt='{image_alt}' />
            </div>

            <div className='where1'>
                {error && <p>{error}</p>}
                {landingpage && (
                <div className='instructions'>
                    <p className='where-p'>{landingpage[0].maps_text}</p>
                </div>
                )}

                <iframe className='where-img1'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.1994490448126!2d-21.844938723532373!3d64.10894471970752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d6736832b01681%3A0xad9986d263da471d!2zTMOma25hc2V0cmnDsA!5e0!3m2!1sen!2sis!4v1699990097702!5m2!1sen!2sis" 
                    style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

            {error && <p>{error}</p>}
            {landingpage && (
            <div className='instructions'>
                <h2 className='where-h2'>{landingpage[0].opening_hours_title}</h2>
                <p className='where-p'>{landingpage[0].opening_hours}</p>
            </div>
            )}

        <Footer/>

        </div>
    );
            }

    export default Landingpage;

    /*        
                <h2 className='where-h2'>{{section_title}}</h2>
                <p className='where-p'>{{section.text}}</p>
                <img className='where-img' src='{{image_source}}' alt='{{image_alt}}' />
                <p className='where-p'>Hægt er að sjá staðsetningu Læknasetursins á Google Maps með því að smella á kortið hér fyrir neðan.</p>
                <img className='where-img' src='/Maps.png' alt='Find Læknasetrið on Maps' />
            </div>
            <div className='when'>
                <h2 className='where-h2'>Opnunartímar</h2>
                    <div className='thedays'>
                        <p>Mánudagar 8-17</p>
                        <p>Þriðjudagar 8-17</p>
                        <p>Miðvikudagar 8-18</p>
                        <p>Fimmtudagar 8-17</p>
                        <p>Föstudagar 8-16</p>
                        <p>Laugardagar Lokað</p>
                        <p>Sunnudagar Lokað</p>
                    </div>

            </div>
        </div>
        <div className='whatissetrid'>
            <h2>Hvað er Læknasetrið?</h2>
            <p>Læknasetrið ehf. var stofnað 1986 og er félag lækna um samvinnu við rekstur læknastofa. Á Læknasetrinu starfa nú um 40 sérfræðingar í lyflækningum og hinum ýmsu sérgreinum auk sálfræðings.</p>
        </div>
        <div className='stjorn-container'>

            <h3 className='stjorn-h3'>Stjórn Læknasetursins ehf.</h3>
                <ul>
                <li>Þórarinn Guðnason stjórnarformaður</li>
                <li>Þórarinn Guðnason stjórnarformaður</li>
                <li>Þórarinn Guðnason stjórnarformaður</li>
                </ul>
            <h3 className='stjorn-h3'>Stjórnendur</h3>
            <ul>
                <li>Þórarinn Guðnason, lækningaforstjóri</li>
                <li>Dagmar Guðmundsdóttir, skrifstofustjóri</li>
                <li>Ásdís Gunnarsdóttir, rekstrarstjóri</li>
            </ul>
        </div>
        <Footer/>
      </>
    )
  }

  export default Landingpage;


      /*const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/config/supabaseClient.js');
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                } 
                else {
                setError('Could not fetch data');
                }
            }   catch (error) {
                setError('Server error');
            }
        }
        fetchData();
    }, []);*/

    //Fetching data from Supabase - start


        /*return (
    
      <> 
    {fetchError && <p>{fetchError}</p>}

    return(
        <div>
            {error && <p>{error}</p>}
            {content && (
                <div>
                    <h2>{content.section_title}</h2>
                    <p>{content.section_text}</p>
                </div>
            )}
        </div>
    );*/
