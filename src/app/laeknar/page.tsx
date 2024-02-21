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

const FontLink = () => (
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap" />
);

const FetchData = () => {
  // State declarations
  const [content, setContent] = useState({});
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [doctorspage, setDoctorspage] = useState<Content[] | null>(null);
  const [position, setPosition] = useState<Position[] | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Staff | null>(null);

  // Fetch data function
  const fetchDataFromTable = async (table: string, setState: React.Dispatch<React.SetStateAction<any>>, query?: string | undefined) => {
      const result = supabase.from(table).select(query);
      type QueryType = QueryData<typeof result>;
      const { data, error } = await result;

      if (error) {
          setFetchError(`Could not fetch ${table}`);
          setState(null);
          console.log('Error:', error);
      }

      if (data) {
          //@ts-ignore
          const typedData: QueryType = data;
          setState(typedData);
          setFetchError("");
      }
  };

  // Effect to fetch data and handle hash navigation
  useEffect(() => {
      // Fetch data function
      fetchDataFromTable('doctorspage', setDoctorspage);
      fetchDataFromTable('position', setPosition, 'name, staff(name, image, doctor, type, education1, education2, education3, education4, experience1, experience2, experience3)');

      // Effect for hash navigation
      const handleHashNavigation = () => {
          if (window.location.hash) {
              const element = document.getElementById(decodeURI(window.location.hash.substring(1)));
              if (element) {
                  element.scrollIntoView();
              }
          }
      };

      handleHashNavigation(); // Handle hash navigation on initial render

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashNavigation);

      return () => {
          // Clean up event listener
          window.removeEventListener('hashchange', handleHashNavigation);
      };
  }, []); // Effect runs only once on mount

//Searchbar - Checking if hashtag is there to
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(decodeURI(window.location.hash.substring(1)));
      if (element) {
        element.scrollIntoView();
      }
    } 
  }, [doctorspage])

  // Pop-up functions
  const openPopup = (person: Staff) => {
      setSelectedPerson(person);
  };

  const closePopup = () => {
      setSelectedPerson(null);
  };

  const get = (name:string) => {
    return doctorspage?.filter(content => content.name === name)[0]?.value ?? "";
  }

  if (fetchError) return <p>{fetchError}</p>;

  return(
    <>
      <Navbar/>
      <div id="laeknar"></div>
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
                          <div key={person.id} id={person.doctor} className='individual-cards' onClick={() => openPopup(person)}>
                          <img className='card-img' src={person.image || undefined} alt='doctor' />
                            <p className='doctors-p1'>{person.doctor}</p>
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

export default FetchData;

  
  