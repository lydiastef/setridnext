'use client'
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import InfoModal from '../../components/modal/infomodal';
import TitleModal from '../../components/modal/titlemodal';
import PhoneModal from '../../components/modal/phonemodal';

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
    const [frontpage, setFrontpage] = useState<Data[] | null>(null);

    //States for the modals (open and close the edit feature)
    const [currentModalId, setCurrentModalId] = useState<string | null>(null);

const [openModalId, setOpenModalId] = useState<string | null>(null);


//Open close modals
const handleOpenModal = (id: string) => {
    setCurrentModalId(id);
};

// Function to handle closing modals
const handleCloseModal = () => {
    setCurrentModalId(null);
};

{openModalId === 'email' && <InfoModal closeModal={() => setOpenModalId(null)} tableName='frontpage' what='email' />}
{openModalId === 'phone number' && <PhoneModal closeModal={() => setOpenModalId(null)} tableName='frontpage' id='phone number' />}
{openModalId === 'oh Monday' && <InfoModal closeModal={() => setOpenModalId(null)} tableName='frontpage' what='oh Monday' />}



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
        console.log("Attempting to log out...");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Logout failed:', error.message);
        } else {
            console.log("Logout successful, reloading page...");
            window.location.reload();
        }
        
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
            <button className='signout-btn' onClick={handleLogout}>Útskrá</button>
            <div className='imgandtext'>
                <img className='main-img' src='/setrid2.jpg' alt='stethoscope' />
            </div>

            <div className='phoneclockcontainer'>
                <div className='iconbtnall'>
                    <div className='iconbtn1'> 
                        <img className='icon2' src='/emailicon.png' alt='email icon' />
                        <h2 className='undericon'>Tölvupóstur</h2>
                        {error && <p>{error}</p>}
                        <div>
                            <p className='info-btn2'>{get('email')}</p>
                        </div>
                        <img className='edit' onClick={() => handleOpenModal('email')} src='/edit.avif' alt='edit button' />
                        {currentModalId === 'email' && <InfoModal closeModal={handleCloseModal} tableName='frontpage' what='email' />}
                        
                        
                    </div>

                    <div className='iconbtn'>
                        <img className='icon2' src='/phoneicon.png' alt='phone'/>
                        <h2 className='undericon'>Símanúmer</h2>
                        {error && <p>{error}</p>}
                            <div className='phone-info'>
                                <p className='info-btn2'>{get('Phone number')}</p>
                                <div className='phone-oh'>
                                    <p className='phone-oh1'>{get('phone-oh1')}</p>
                                    <p className='phone-oh2'>{get('phone-oh2')}</p>
                                </div>
                            </div>
                        <img className='edit' onClick={() => handleOpenModal('phone number')} src='/edit.avif' alt='edit button' />
                        {currentModalId === 'phone number' && <PhoneModal closeModal={handleCloseModal} tableName='frontpage' id='phone number' />}
                    </div>

                    <div className='iconbtn1'>
                        <img className='icon2' src='/clockicon.png' alt='clock icon' />
                        <h2 className='undericon'>Opnunartímar</h2>
                        {error && <p>{error}</p>}
                        <p className='info-btn2'>{get('oh Monday')}</p>
                        <img className='edit' onClick={() => handleOpenModal('oh Monday')} src='/edit.avif' alt='edit button' />
                        {currentModalId === 'oh Monday' && <InfoModal closeModal={handleCloseModal} tableName='frontpage' what='oh Monday' />}
                    </div>
                </div>
            </div>
            
        <div className='main-container'>
            <h2>Velkomin í Læknasetrið</h2>
            {error && <p>{error}</p>}
            <p className='text'>{get('intro text')}</p>
            <img className='edit' onClick={() => handleOpenModal('intro-text')} src='/edit.avif' alt='edit button'/>
            {currentModalId === 'intro-text' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='intro text'/>}
        
            <div className='midsectioncontainer'>
                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon' src='/doctorsicon.png' alt='doctor icon' />
                        <p className='box-p'>Sjáðu alla lækna og annað starfsfólk sem starfar 
                        í Læknasetrinu</p>
                        <Link href='/laeknar'>
                            <button className='drbtn'>Læknar</button>
                        </Link>
                    </div>
                </div>

                <div className='midsectionbtn'>
                    <div className='textandbtn'>
                    <img className='icon3' src='/ecgicon.png' alt='doctor icon' />
                        <p className='box-p'>Lestu um allar þær rannsóknir sem gerðar
                        eru í Læknasetrinu</p>
                        <Link href='/frontpageadmin'>
                            <button className='drbtn'>Rannsóknir</button>
                        </Link>
                    </div>
                </div>
            </div>

            <h2 className='where-h2'>Staðsetning</h2>
            <div className='where'>
                <div className='where1'>
                    {error && <p>{error}</p>}
                    <div className='instructions'>
                        <p className='where-p'>{get('left text')}</p>
                    </div>
                    <img className='edit1' onClick={() => handleOpenModal('left-text')} src='/edit.avif' alt='edit button'/>
                        {currentModalId === 'left-text' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='left text'/>}
                        {error && <p>{error}</p>}
                        <img src={get('left image')} className='where-img'></img>

                    <img className='edit' onClick={() => handleOpenModal('right image')} src='/edit.avif' alt='edit button'/>
                    {currentModalId === 'right image' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='right image'/>}
            </div>

            <div className='where1'>
                {error && <p>{error}</p>}
                <div className='instructions1'>
                    <p className='where-p'>{get('right text')}</p>
                </div>
                <img className='edit1' onClick={() => handleOpenModal('right-text')} src='/edit.avif' alt='edit button'/>
                    {currentModalId === 'right-text' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='right text'/>}

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
                <img className='edit' onClick={() => handleOpenModal('map-info')} src='/edit.avif' alt='edit button'/>
                {currentModalId === 'map-info' && <TitleModal closeModal={handleCloseModal} tableName='doctorspage' what='map info'/>}
            

            </div>
        </div>
        </div>
        <Footer/>

        </div>
    );
            }

    export default Frontpageadmin;