'use client'
import './style.css';

import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react'
/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    text: string | null;
    title: string | null;
}

function Landingpage() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch('/config/supabaseClient.js');
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setContent(data);
    //             } 
    //             else {
    //             setError('Could not fetch data');
    //             }
    //         }   catch (error) {
    //             setError('Server error');
    //         }
    //     }
    //     fetchData();
    // }, []);

    //Fetching data from Supabase - start

    const [fetchError, setFetchError] = useState("")
    const [where, setWhere] = useState(null) as [Data[] | null, (where: Data[] | null) => void]

    useEffect(() => {
        const fetchWhere = async () => {
            const { data, error } = await supabase
            .from('where') //fetching data from this table in Supabase
            .select()

            if(error) {
                setFetchError('Could not fetch Where')
                setWhere(null)
                console.log(error)
            }
            if (data) {
                setWhere(data)
                setFetchError("")
            }
        }

        fetchWhere();
    }, [])

    //Fetching data from Supabase - end

    console.log(where)
    if(fetchError) return <p>{fetchError}</p>

    return(
        <div>
            {error && <p>{error}</p>}
            {where && (
                <div>
                    <h2>{where[0].title}</h2>
                    <p>{where[0].text}</p>
                </div>
            )}
        </div>
    );
}
export default Landingpage;

        /*
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
                535-7700
            </div>
            <Link href='/rannsoknir'>
              <div>
                <button className='info-btn2'>Rannsóknir</button>
              </div>
            </Link>
        </div>
        <div className='instructions'>
            <div className='where'>
            {where && (
                <div className='where'>
                    <p>{where[0].item.title}</p>
                </div>
            )}
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
