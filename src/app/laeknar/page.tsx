'use client'
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'
import { QueryData, QueryError } from '@supabase/supabase-js'


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
  education1: string | null;
  education2: string | null;
  education3: string | null;
  education4: string | null;
  experience1: string | null;
  experience2: string | null;
  experience3: string | null;
  type: string | null;
}

type Position = {
  created_at: string;
  id: number;
  name: string | null;
}


function fetchData() {

  const FontLink = () => (
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap" />
  );

    //Fetching data from Supabase - start

  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

  const [fetchError, setFetchError] = useState("")
  const [doctorspage, setDoctorspage] = useState(null) as [Content[] | null, (laeknar: Content[] | null) => void]
  const [position, setPosition] = useState(null) as [Position[] | null, (laeknar: Position[] | null) => void]

  
  //Pop-up start
  const [selectedPerson, setSelectedPerson] = useState<Staff | null>(null);
  const openPopup = (person: Staff) => {
    setSelectedPerson(person);
  };
  const closePopup = () => {
    setSelectedPerson(null);
  };
  
  //Pop-up end

  

  const get=(name:string) => {
    return doctorspage?.filter(content => content.name === name) [0].value as string
}

  useEffect(() => {

    const fetchDataFromTable = async (table:string, setState:React.Dispatch<React.SetStateAction<any>>, query?:string | undefined) => {
     /* await supabase.auth.signUp({
        email: 'lydiadoula@gmail.com',
        password: '123456',
      })*/

      //const fetchLaeknar = async () => {
        const result = supabase
        .from(table) //fetching data from this table in Supabase
        .select(query)
        type QueryType=QueryData<typeof result>
          const { data, error } = await result

          if(error) {
              setFetchError(`Could not fetch ${table}`);
              setState(null)
              console.log('this is',error)
          }
          if (data) {
            //@ts-ignore
            const typedData: result = data
              setState(typedData)
              setFetchError("")
          }
      };

      fetchDataFromTable('doctorspage', setDoctorspage);

      fetchDataFromTable('position', setPosition,'name, staff(name, image, doctor, type, education1, education2, education3, education4, experience1, experience2, experience3)');

  }, []);

  //Fetching data from Supabase - end

  console.log(position)
  if(fetchError) return <p>{fetchError}</p>

  return(
    <>
      <Navbar/>
        <div>
          <div className='title-h1'>{error && <p>{error}</p>}
            <h1 className='h1'>{get('title')}</h1>
          </div>
          
          <div className='image-and-intro'>
            <img className='main-img2' src='/laeknar.avif' alt='two doctors' />
            {error && <p>{error}</p>}
            <p className='intro-p'>{get('intro text')}</p>
          </div>
        </div>

          <div className='laeknar-container'>
            
                    {error && <p>{error}</p>}
                    {position?.map((pos) => {
                      
                    //@ts-ignore
                      const staff = pos.staff
                      return(
                        <div>
                          <h1 className='laeknar-h1'>{pos.name}</h1>
                      
                  <div className='cards'>
                    {
                    //@ts-ignore
                    staff?.map((person) => { //Filter what type of doctor appears where
                        return(
                          <div key={person.id} className='individual-cards' onClick={() => openPopup(person)}>
                          <img className='card-img' src={person.image || undefined} alt='doctor' />
                            <p className='doctors-p'>{person.doctor}</p>
                            <p className='doctors-p'>{person.type}</p>
                            <p className='doctors-p'>{person.position}</p>
                          </div>
                        )
                    })}
                  </div>
                  {selectedPerson && (
                    <>
                    <div className="overlay" onClick={closePopup}></div>
                      <div className="popup-card">
                        <img className="popup-img" src={selectedPerson.image || undefined} alt="doctor" />
                        <p className="popup-doctors-p1">{selectedPerson.doctor}</p>
                        <p className="popup-doctors-p2">{selectedPerson.type}</p>
                        <p className='label'>Menntun</p>
                        <p className="popup-doctors-p3">{selectedPerson.education1}</p>
                        <p className="popup-doctors-p3">{selectedPerson.education2}</p>
                        <p className="popup-doctors-p3">{selectedPerson.education3}</p>
                        <p className="popup-doctors-p3">{selectedPerson.education4}</p>
                        <p className='label'>Vinnustaðir/Reynsla</p>
                        <p className="popup-doctors-p4">{selectedPerson.experience1}</p>
                        <p className="popup-doctors-p4">{selectedPerson.experience2}</p>
                        <p className="popup-doctors-p4">{selectedPerson.experience3}</p>
                        <p className='label'>Sérsvið</p>
                        <button className='close-btn' onClick={closePopup}>X</button>
                      </div>
                    </>                  
                    )}
                    </div>
                  )})}    
          </div>
        <Footer/>
      </>
  );
}

export default fetchData;

  
  