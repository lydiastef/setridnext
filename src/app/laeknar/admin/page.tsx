'use client'
import '../style.css';
import Navbar from '../../../components/navbar/page';
import Footer from '../../../components/footer/page';
import supabase from '../../../config/supabaseClient';
import { useEffect, useState } from 'react'
import TitleModal from '../../../components/modal/titlemodal';
import PersonModal from '../../../components/modal/personmodal';
import { useRouter } from 'next/navigation'


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
const router = useRouter()

const [content, setContent] = useState({});
const [error, setError] = useState(null);

const [fetchError, setFetchError] = useState("")
const [doctorspage, setDoctorspage] = useState(null) as [Content[] | null, (laeknar: Content[] | null) => void]
const [position, setPosition] = useState(null) as [Position[] | null, (laeknar: Position[] | null) => void]

//States for the modals (open and close the edit feature)
const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);
const [isModalOpenp, setIsModalOpenp] = useState(-1);


const get=(name:string) => {
  return doctorspage?.filter(content => content.name === name) [0].value as string
}

//Open close modals
const openModal1 = () => {setIsModalOpen1(true);};
const closeModal1 = () => {setIsModalOpen1(false);};

const openModal2 = () => {setIsModalOpen2(true);};
const closeModal2 = () => {setIsModalOpen2(false);};

const openModalp = (id:number) => {setIsModalOpenp(id);};
const closeModalp = () => {setIsModalOpenp(-1);};

useEffect(() => {
  const fetchDataFromTable = async (table: string) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('http://localhost:3000/login')
      }
    //const fetchLaeknar = async () => {
      let setState = table === 'position'? setPosition:setDoctorspage

      let query=table === 'position'?'name, staff(name, image, doctor, id)':undefined
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

console.log(position)
if(fetchError) return <p>{fetchError}</p>

console.log(isModalOpenp)

return(
  <>
    <Navbar/>
      <div>
        <div className='edit-content'>{error && <p>{error}</p>}
          <h1 className='h1'>{get('title')}</h1>
          <img className='edit' onClick={openModal1} src='/edit.avif' alt='edit button' />
          {isModalOpen1 && <TitleModal closeModal={closeModal1} tableName='doctorspage' what='title' />}

        </div>
        <div className='image-and-intro'>
          <img className='main-img2' src='/laeknar.avif' alt='two doctors'/>
          <div className='edit-content'>
            {error && <p>{error}</p>}
            <p className='intro-p'>{get('intro text')}</p>
            <img className='edit' onClick={openModal2} src='/edit.avif' alt='edit button'/>
            {isModalOpen2 && <TitleModal closeModal={closeModal2} tableName='doctorspage' what='intro text'/>}

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
                          <img className='edit-cards' onClick={() => openModalp(person.id)} src='/edit.avif' alt='edit button'/>
                          <img className='card-img' src={person.image || undefined} alt='doctor' />
                          <p className='doctors-p'>{person.doctor}</p>
                          <p className='doctors-p'>{person.position}</p>
                          {isModalOpenp === person.id && <PersonModal closeModal={closeModalp} tableName='staff' id={person.id}/>}
                          
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

//In the first return part, the h1, img and TitleModal are children
//In the second return part, the p, img and TitleModal are children
//The parents to them are the 'edit content' divs around them


  
  