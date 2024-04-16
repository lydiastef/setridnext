'use client'
import './style.css';
import NavbarAdmin from '../../components/navbar/navbaradmin/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import InfoModal from '../../components/modal/infomodal';
import TitleModal from '../../components/modal/titlemodal';
import PhoneModal from '../../components/modal/phonemodal';
import SignOut from '../../components/signoutbtn/page';

/*import { useRouter } from 'next/navigation';*/

type Data = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
}

function Frontpageadmin() {
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState("")
    const [frontpage, setFrontpage] = useState<Data[] | null>(null);
    const [currentModalId, setCurrentModalId] = useState<string | null>(null);

//Open close modals
const handleOpenModal = (id: string) => {
    setCurrentModalId(id);
};
const handleCloseModal = () => {
    setCurrentModalId(null);
};
//End

const get = (name: string) => frontpage?.find(item => item.name === name)?.value || "";

//Logout
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
    //End
    
    useEffect(() => {
        const fetchFrontpage = async () => {
            const { data, error } = await supabase.from('frontpage').select();
            error ? setFetchError('Could not fetch data') : setFrontpage(data);
        }
        fetchFrontpage();
    }, [])

    if (fetchError) return <p>{fetchError}</p>;

    return(
        <div>
            <NavbarAdmin/>
            <SignOut/>
            <button className='signout-btn' onClick={handleLogout}>Útskrá</button>
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
                        <img className='edit' onClick={() => handleOpenModal('email')} src='./images/edit.avif' alt='edit button' />
                        {currentModalId === 'email' && <InfoModal closeModal={handleCloseModal} tableName='frontpage' what='email' />}
                        
                        
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
                        <img className='edit' onClick={() => handleOpenModal('phone number')} src='./images/edit.avif' alt='edit button' />
                        {currentModalId === 'phone number' && <PhoneModal closeModal={handleCloseModal} tableName='frontpage' id='phone number' />}
                    </div>

                    <div className='iconbtn1'>
                        <img className='icon2' src='./images/clockicon.png' alt='clock icon' />
                        <h2 className='undericon'>Opnunartímar</h2>
                        {error && <p>{error}</p>}
                        <p className='info-btn2'>{get('oh Monday')}</p>
                        <img className='edit' onClick={() => handleOpenModal('oh Monday')} src='./images/edit.avif' alt='edit button' />
                        {currentModalId === 'oh Monday' && <InfoModal closeModal={handleCloseModal} tableName='frontpage' what='oh Monday' />}
                    </div>
                </div>
            </div>
            
        <div className='main-container'>
            <h2>Velkomin í Læknasetrið</h2>
            {error && <p>{error}</p>}
            <p className='text'>{get('intro text')}</p>
            <img className='edit' onClick={() => handleOpenModal('intro-text')} src='./images/edit.avif' alt='edit button'/>
            {currentModalId === 'intro-text' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='intro text'/>}
        
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
                    <img className='edit1' onClick={() => handleOpenModal('left-text')} src='./images/edit.avif' alt='edit button'/>
                        {currentModalId === 'left-text' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='left text'/>}
                        {error && <p>{error}</p>}
                        <img src={get('left image')} className='where-img'></img>

                    <img className='edit' onClick={() => handleOpenModal('right image')} src='./images/edit.avif' alt='edit button'/>
                    {currentModalId === 'right image' && <TitleModal closeModal={handleCloseModal} tableName='frontpage' what='right image'/>}
            </div>

            <div className='where1'>
                {error && <p>{error}</p>}
                <div className='instructions1'>
                    <p className='where-p'>{get('right text')}</p>
                </div>
                <img className='edit1' onClick={() => handleOpenModal('right-text')} src='./images/edit.avif' alt='edit button'/>
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
                <img className='edit' onClick={() => handleOpenModal('map-info')} src='./images/edit.avif' alt='edit button'/>
                {currentModalId === 'map-info' && <TitleModal closeModal={handleCloseModal} tableName='doctorspage' what='map info'/>}
            

            </div>
        </div>
        </div>
        <Footer/>

        </div>
    );
            }

    export default Frontpageadmin;