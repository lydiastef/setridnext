'use client'
import './style.scss';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react'

type Data = {
    created_at: string;
    id: number;
    staff_title: string | null;
    staff_intro: string | null;
    name: string | null;
    position: string | null;
}

function fetchData() {

    //Fetching data from Supabase - start

  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

  const [fetchError, setFetchError] = useState("")
  const [fetchData, setFetchData] = useState(null) as [Data[] | null, (laeknar: Data[] | null) => void]

  useEffect(() => {
    const fetchDataFromTable = async (table: string)=>{
      //const fetchLaeknar = async () => {
          const { data, error } = await supabase
          .from('table') //fetching data from this table in Supabase
          .select()

          if(error) {
              setFetchError(`Could not fetch ${table}`);
              setFetchData(null)
              console.log(error)
          }
          if (data) {
              setFetchData(data)
              setFetchError("")
          }
      };

      fetchDataFromTable('doctors');

      fetchDataFromTable('staff');
  }, []);

  //Fetching data from Supabase - end

  console.log(fetchData)
  if(fetchError) return <p>{fetchError}</p>

  return(
    <>
      <Navbar/>
        <div>
          {error && <p>{error}</p>}
            {fetchData && fetchData[0]?.staff_title && (
              <div>
                <h1 className='h1'>{fetchData[0].staff_title}</h1>
              </div>
            )}
        </div>

      <div className='image-and-intro'>
        <img className='main-img2' src='/laeknar.avif' alt='two doctors' />
        {error && <p>{error}</p>}
          {fetchData && fetchData[0]?.staff_intro && (
           <div>
            <p className='intro-p'>{fetchData[0].staff_intro}</p>
            </div>
            )}
      </div>
          <div className='laeknar-container'>
            <h2 className='laeknar-h2'>Blóðlæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Brynjar Viðarsson - Blóðlæknir</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Guðmundur Rúnarsson - Blóðlæknir</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/woman.avif' alt='doctor' />
                  <p className='doctors-p'>Sigrún Reykdal - Blóðlæknir</p>
                </div>
              </div>

              <h2 className='laeknar-h2'>Gigtlæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Árni Jón Geirsson - Gigtlæknir</p>
                </div>
              </div>

              <h2 className='laeknar-h2'>Hjartalæknar</h2>
              <div className='cards'>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Atli Einarsson - hjartasjúkdómar</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Geir Hirlekar</p>
                </div>
                <div className='individual-card'>
                  <img className='card-img' src='/man.avif' alt='doctor' />
                  <p className='doctors-p'>Daníel Ásgeirsson - lyflækningar, hjarta- og nýrnasjúkdómar</p>
                </div>
              </div>
          </div>
        <Footer/>
      </>
    );
}

export default fetchData;

  