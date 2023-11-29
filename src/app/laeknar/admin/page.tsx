'use client'
import '../style.css';
import Navbar from '../../../components/navbar/page';
import Footer from '../../../components/footer/page';
import supabase from '../../../config/supabaseClient';
import { useEffect, useState } from 'react'
import TitleModal from '../../../components/modal/titlemodal';


type Content = {
  created_at: string;
  id: number;
  name: string | null;
  value: string | null;
}

type Staff = {
created_at: string;
id: number;
name: string | null;
doctor: string | null;
image: string | null;
position: string | null;
}

type Position = {
created_at: string;
id: number;
name: string | null;
staff: Staff[] | null;
}


function fetchData() {

  //Fetching data from Supabase - start

const [content, setContent] = useState({});
const [error, setError] = useState(null);

const [fetchError, setFetchError] = useState("")
const [doctorspage, setDoctorspage] = useState(null) as [Content[] | null, (laeknar: Content[] | null) => void]
const [position, setPosition] = useState(null) as [Position[] | null, (laeknar: Position[] | null) => void]
const [isModalOpen, setIsModalOpen] = useState(false);

const get=(name:string) => {
  return doctorspage?.filter(content => content.name === name) [0].value as string
}

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

useEffect(() => {
  const fetchDataFromTable = async (table: string) => {
    //const fetchLaeknar = async () => {
      let setState = table === 'position'? setPosition:setDoctorspage

      let query=table === 'position'?'name, staff(name, image, doctor)':undefined
        const { data, error } = await supabase
        .from(table) //fetching data from this table in Supabase
        .select(query)

        if(error) {
            setFetchError(`Could not fetch ${table}`);
            setState(null)
            console.log(error)
        }
        if (data) {
          //@ts-ignore
            setState(data)
            setFetchError("")
        }
    };

    fetchDataFromTable('doctorspage');

    fetchDataFromTable('position');
}, []);

//Fetching data from Supabase - end

console.log(doctorspage)
if(fetchError) return <p>{fetchError}</p>

return(
  <>
    <Navbar/>
      <div>
        <div className='edit-content'>{error && <p>{error}</p>}
          <h1 className='h1'>{get('title')}</h1>
          <img className='edit' onClick={openModal} src='/edit.avif' alt='edit button' />
          {isModalOpen && <TitleModal closeModal={closeModal} />}

        </div>
        <div className='image-and-intro'>
          <img className='main-img2' src='/laeknar.avif' alt='two doctors'/>
          <div className='edit-content'>
            {error && <p>{error}</p>}
            <p className='intro-p'>{get('intro text')}</p>
            <img className='edit' src='/edit.avif' alt='edit button'/>
          </div>
        </div>
      </div>

        <div className='laeknar-container'>
          
                  {error && <p>{error}</p>}
                  {position?.map((pos) => {
                    const staff = pos.staff
                    return(
                      <div>
                        <h1 className='laeknar-h1'>{pos.name}</h1>
                    
                <div className='cards'>
                  {staff?.map((person) => { //Filter what type of doctor appears where
                      return(
                        <div className='edit-content'>
                          <div className='individual-cards'>
                          <img className='edit-cards' src='/edit.avif' alt='edit button'/>
                          <img className='card-img' src={person.image || undefined} alt='doctor' />
                          <p className='doctors-p'>{person.doctor}</p>
                          <p className='doctors-p'>{person.position}</p>
                          
                        </div>
                      </div>
                      )
                  })}
                </div>
                  </div>

                  )})}    
        </div>
      <Footer/>
    </>
);
}

export default fetchData;


  
  