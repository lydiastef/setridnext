'use client'
import './style.scss';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'

type Intro = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;
  }

type Cards = {
    created_at: string;
    id: number;
    name: string | null;
    value: string | null;

  }

function Rannsoknir() {

//Fetching data from Supabase - start

const [data, setData] = useState({});
const [error, setError] = useState(null);

const [fetchError, setFetchError] = useState("")
const [rannsoknir, setRannsoknir] = useState(null) as [Intro[] | null, (rannsoknir: Intro[] | null) => void]
const [rannsoknircards, setRannsoknircards] = useState(null) as [Cards[] | null, (rannsoknircards: Cards[] | null) => void]

const get = (name: string) => {
    const filteredContent = rannsoknir?.filter(content => content.name === name);
    return filteredContent && filteredContent.length > 0 ? filteredContent[0].value as string : "";
    };
  

useEffect(() => {
    const fetchDataFromTable = async (table: string) => {
      //const fetchLaeknar = async () => {
        let setState = table === 'rannsoknircards'? setRannsoknircards:setRannsoknir;

        let query = table === 'rannsoknircards'?'name, value':undefined
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

      fetchDataFromTable('rannsoknir');
      fetchDataFromTable('rannsoknircards');
  }, []);

  //Fetching data from Supabase - end

  console.log(rannsoknir)
  if(fetchError) return <p>{fetchError}</p>

    return (
      <>
      <Navbar/>
      <div>
        <h1 className='h1'>Rannsóknir</h1>
      </div>  
        <div className='image-and-intro-rannsoknir'>
            <img className='main-img3' src='/rannsoknir.avif' alt='two doctors' />
            {error && <p>{error}</p>}
            <p className='intro-p'>{get('intro')}</p>
        </div>



                      
        <div className='btn-container'>
            <div className='individual-btn'>
            {error && <p>{error}</p>}
            <p className='btn-p'>{get('Hjartaómskoðun')}</p>
            </div>
        </div>
    <Footer/>
    </>
  );
}

  export default Rannsoknir;

/*


        <div className='btn-container'>
            <div className='individual-btn'>
                {error && <p>{error}</p>}
                {rannsoknircards?.map((cards) => (
                <p className='cards-p'>{cards.name}</p>
                ))}
            </div>
        </div>
    <Footer/>
    </>
  );
}

export default Rannsoknir;

        


        ))}



</div>
      <div className='btn-container'>
        <div className='individual-btn'>
            <p className='rannsokn-p'>Hjartaómskoðun</p>
        </div>
        <div className='individual-btn'>
            <p className='rannsokn-p'>Áreynslupróf</p>
        </div>
        <div className='individual-btn'>
            <p className='rannsokn-p'>24-klst blóðþrýstingsmælingar</p>
        </div>
        <div className='individual-btn'>
            <p className='rannsokn-p'>24 eða 48 klst Holter (hjartasíriti)</p>
        </div>
        <div className='individual-btn'>
            <p className='rannsokn-p'>Snjallsíma-Holter</p>
        </div>
        <div className='individual-btn'>
            <p className='rannsokn-p'>Lungnarannsóknir - spirometria</p>
        </div>
      </div>
*/
