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
  staff: Staff[] | null;
}

//String means "made up of text"

const FetchData = () => {
  // State declarations
  const [error, setError] = useState(null); //Handle errors
  const [fetchError, setFetchError] = useState(""); //Handle errors that occur while trying to fetch data
  const [doctorspage, setDoctorspage] = useState<Content[] | null>(null);
  const [position, setPosition] = useState<Position[] | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Staff | null>(null); //Which Staff member is currently selected in your UI. State null means that no staff member is selected. That's the default state. When a user selects a staff member (by clicking on them in the UI), you update this state using setSelectedPerson.

  // Fetch data function
  //This function handles the asynchronous fetching of data from Supabase, updates the application state with the results, and manages errors that might occur during the process.
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

  useEffect(() => {
    fetchDataFromTable('doctorspage', setDoctorspage);
    fetchDataFromTable('position', setPosition, 'name, staff(name, image, doctor, type, education1, education2, education3, education4, experience1, experience2, experience3)');
    //We want to get data from these two tables in Supabase

    //UseEffect hook for controlling what information comes into view upon scrolling the popup card
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
        window.removeEventListener('hashchange', handleHashNavigation);
      };
  }, []); // Effect runs only once on mount

  // Pop-up functions - fetching data from Supabase for the popup cards
  const openPopup = (person: Staff) => {
      setSelectedPerson(person);
  };

  const closePopup = () => {
      setSelectedPerson(null);
  };

  //This "Get" function gets data (value) from the doctorspage table in Supabase based on a name that it filters through. 
  const get = (name:string) => {
    return doctorspage?.filter(content => content.name === name)[0]?.value ?? "";
  }
  //The first question mark is used to prevent crashing if there's no data to search through in the doctorspage (it might be null or empty).
  //Then it looks for an item where the name property matches the name you passed to the function.
  //The filter returns a list of all items that match the condition so [0] is there to get the first item from this list. 
  //The ?.value part attempts to access the value property of the item in the column "name". The ? before .value is a safety check for if there's no item found.
  //The double question marks ?? are used to provide a default value. If the value is undefined or null, it returns an empty string "". This way, the function always returns a string, even if no matching item is found.
  
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
            <img className='main-img2' src='./images/laeknar.avif' alt='two doctors' />
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

  
  