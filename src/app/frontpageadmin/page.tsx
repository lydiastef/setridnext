'use client'
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import InfoModal from '../../components/modal/infomodal';
import TitleModal from '../../components/modal/titlemodal';


/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Frontpageadmin() {

    const [content, setContent] = useState({});
    const [error, setError] = useState(null);

    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState(null) as [Data[] | null, (frontpage: Data[] | null) => void]

    //States for the modals (open and close the edit feature)
const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);
const [isModalOpenp, setIsModalOpenp] = useState(-1);

//Open close modals
const openModal1 = () => {setIsModalOpen1(true);};
const closeModal1 = () => {setIsModalOpen1(false);};

const openModal2 = () => {setIsModalOpen2(true);};
const closeModal2 = () => {setIsModalOpen2(false);};


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

      async function handleLogout() {
        await supabase.auth.signOut();
        window.location.reload();
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
            <button className='signout-btn' onClick={handleLogout}>Sign Out</button>
            <div className='imgandtext'>
                <img className='main-img' src='/setrid2.jpg' alt='stethoscope' />
            </div>

            <div className='phoneclockcontainer'>
                <div className='iconbtnall'>
                    <div className='iconbtn1'> 
                        <img className='icon2' src='/emailicon.png' alt='email icon' />
                        <h2 className='undericon'>Tölvupóstur</h2>
                        <img className='edit' onClick={openModal1} src='/edit.avif' alt='edit button' />
                        {isModalOpen1 && <InfoModal closeModal={closeModal1} tableName='frontpage' what='title' />}
                        {error && <p>{error}</p>}
                        <div>
                            <p className='info-btn2'>{get('email')}</p>
                        </div>
                    </div>

                    <div className='iconbtn'>
                        <img className='icon2' src='/phoneicon.png' alt='phone'/>
                        <h2 className='undericon'>Símanúmer</h2>
                        <img className='edit' onClick={openModal1} src='/edit.avif' alt='edit button' />
                        {isModalOpen1 && <InfoModal closeModal={closeModal1} tableName='frontpage' what='title' />}
                            {error && <p>{error}</p>}
                            <div className='phone-info'>
                                <p className='info-btn2'>{get('Phone number')}</p>
                                <div className='phone-oh'>
                                    <p className='phone-oh1'>{get('phone-oh1')}</p>
                                    <p className='phone-oh2'>{get('phone-oh2')}</p>
                                </div>
                            </div>
                    </div>

                    <div className='iconbtn1'>
                        <img className='icon2' src='/clockicon.png' alt='clock icon' />
                        <h2 className='undericon'>Opnunartímar</h2>
                        <img className='edit' onClick={openModal1} src='/edit.avif' alt='edit button' />
                        {isModalOpen1 && <InfoModal closeModal={closeModal1} tableName='frontpage' what='title' />}
                        {error && <p>{error}</p>}
                        <p className='info-btn2'>{get('oh Monday')}</p>
                    </div>
                </div>
            </div>
            
        <div className='main-container'>
            <h2>Velkomin í Læknasetrið</h2>
            <img className='edit' onClick={openModal2} src='/edit.avif' alt='edit button'/>
            {isModalOpen2 && <TitleModal closeModal={closeModal2} tableName='frontpage' what='intro text'/>}
            <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat.<br></br><br></br> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum.</p>
        
        
            <div className='midsectioncontainer'>
                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon' src='/doctorsicon.png' alt='doctor icon' />
                        <p className='box-p'>Sjáðu alla lækna og annað starfsfólk sem starfar 
                        í Læknasetrinu</p>
                        <Link href='/laeknar'>
                            <button>Læknar</button>
                        </Link>
                    </div>
                </div>

                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon3' src='/ecgicon.png' alt='doctor icon' />
                        <p className='box-p'>Lestu um allar þær rannsóknir sem gerðar
                        eru í Læknasetrinu</p>
                        <Link href='/frontpageadmin'>
                            <button>Rannsóknir</button>
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
        </div>
        <Footer/>

        </div>
    );
            }

    export default Frontpageadmin;