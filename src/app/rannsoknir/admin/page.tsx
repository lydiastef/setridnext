'use client'
import '../../rannsoknir/style.css';
import Navbar from '../../../components/navbar/page';
import Footer from '../../../components/footer/page';
import supabase from '../../../config/supabaseClient';
import TitleModal from '../../../components/modal/titlemodal';
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
    icon: string | null;
    info: string | null;
  }

function Rannsoknir() {

//Fetching data from Supabase - start

const [data, setData] = useState({});
const [error, setError] = useState(null);

const [fetchError, setFetchError] = useState("")
const [rannsoknir, setRannsoknir] = useState(null) as [Intro[] | null, (rannsoknir: Intro[] | null) => void]
const [rannsoknircards, setRannsoknircards] = useState(null) as [Cards[] | null, (rannsoknircards: Cards[] | null) => void]

//States for the modals (open and close the edit feature)
const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);
//const [isModalOpenp, setIsModalOpenp] = useState(-1);

const get = (name: string) => {
    const filteredContent = rannsoknir?.filter(content => content.name === name);
    return filteredContent && filteredContent.length > 0 ? filteredContent[0].value as string : "";
    };

//Open close modals
const openModal1 = () => {setIsModalOpen1(true);};
const closeModal1 = () => {setIsModalOpen1(false);};

const openModal2 = () => {setIsModalOpen2(true);};
const closeModal2 = () => {setIsModalOpen2(false);};

//const openModalp = (id:number) => {setIsModalOpenp(id);};
//const closeModalp = () => {setIsModalOpenp(-1);};
  

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
        <div className='image-and-intro'>
            <img className='main-img2' src='/rannsoknir.avif' alt='two doctors' />
            <div className='edit-content'>
                {error && <p>{error}</p>}
                <p className='intro-p'>{get('intro')}</p>
                <img className='edit' onClick={openModal1} src='/edit.avif' alt='edit button' />
                {isModalOpen1 && <TitleModal closeModal={closeModal1} tableName='rannsoknir' what='intro' />}
            </div>
        </div>



        <div className='btn-container'>
        {rannsoknircards?.map(rannsokn => {
            return (
                <div className='individual-btn'>
                    <img className='card-icon' src={rannsokn.icon || undefined} alt='icon' />
                {error && <p>{error}</p>}
                <h2 className='btn-h2'>{rannsokn.name}</h2>
                <p className='btn-p'>{rannsokn.info}</p>
                </div>
            )
        })}          
      </div>        
    <Footer/>
    </>
  );
}

  export default Rannsoknir;
