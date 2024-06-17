'use client'
import '../style.css';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavbarAdmin from '../../../components/navbar/navbaradmin/page';
import Footer from '../../../components/footer/page';
import { useEffect, useState } from 'react'
import TitleModal from '../../../components/modal/titlemodal';
import PersonModal from '../../../components/modal/personmodal';
import { useRouter } from 'next/navigation';
import NewModal from '../../../components/modal/newmodal';

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

function DoctorsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string>("");
  const [doctorspage, setDoctorspage] = useState<Content[] | null>(null);
  const [position, setPosition] = useState<Position[] | null>(null);
  const [positions, setPositions] = useState<{ id: number, name: string }[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Staff | null>(null);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpenp, setIsModalOpenp] = useState<number | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const get = (name: string) => {
    return doctorspage?.find(content => content.name === name)?.value || '';
  }

  const openModal1 = () => { setIsModalOpen1(true); };
  const closeModal1 = () => {
    setIsModalOpen1(false);
    fetchDataFromTable('doctorspage');
  };

  const openModal2 = () => { setIsModalOpen2(true); };
  const closeModal2 = () => {
    setIsModalOpen2(false);
    fetchDataFromTable('doctorspage');
  };

  const openModalp = (id: number) => { 
    console.log("Opening modal for person with id:", id); // Debug log
    setIsModalOpenp(id); 
  };
  const closeModalp = () => {
    setIsModalOpenp(null);
    fetchDataFromTable('position');
  };

  const openNewModal = () => { setIsNewModalOpen(true); };
  const closeNewModal = () => {
    setIsNewModalOpen(false);
    fetchDataFromTable('position');
  };

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const handleDeleteCard = async (id: number) => {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      fetchDataFromTable('position');
    }
  };

  const fetchDataFromTable = async (table: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('http://setridnext.vercel.app/login');
      return;
    }

    let setState: (value: any) => void;
    let query: string | undefined;

    if (table === 'position') {
      setState = setPosition;
      query = 'name, staff(name, image, doctor, id, position_id)';
    } else {
      setState = setDoctorspage;
      query = undefined;
    }

    const { data, error } = await supabase
      .from(table)
      .select(query);

    if (error) {
      setFetchError(`Could not fetch ${table}`);
      setState(null);
      console.log(error);
    } else {
      setState(data);
      setFetchError("");
    }
  };

  useEffect(() => {
    fetchDataFromTable('doctorspage');
    fetchDataFromTable('position');

    const fetchPositions = async () => {
      const { data, error } = await supabase.from('position').select('id, name');
      if (error) {
        console.error('Error fetching positions:', error);
      } else {
        setPositions(data);
      }
    };

    fetchPositions();
  }, [router]);

  const openPopup = (person: Staff) => {
    setSelectedPerson(person);
  };

  const closePopup = () => {
    setSelectedPerson(null);
  };

  if (fetchError) return <p>{fetchError}</p>;

  return (
    <>
      <NavbarAdmin />
      <div>
        <div className='edit-content'>{error && <p>{error}</p>}
          <h1 className='h1'>{get('title')}</h1>
          <img className='edit' onClick={openModal1} src='../images/edit.avif' alt='edit button' />
          {isModalOpen1 && <TitleModal closeModal={closeModal1} tableName='doctorspage' what='title' />}
          <button className='signout-btn' onClick={handleLogout}>Sign Out</button>
        </div>
        <div className='image-and-intro'>
          <img className='main-img2' src='../images/laeknar.avif' alt='two doctors' />
          <div className='edit-content'>
            {error && <p>{error}</p>}
            <p className='intro-p'>{get('intro text')}</p>
            <img className='edit' onClick={openModal2} src='../images/edit.avif' alt='edit button' />
            {isModalOpen2 && <TitleModal closeModal={closeModal2} tableName='doctorspage' what='intro text' />}
          </div>
        </div>
      </div>
      <button className='newmodal-btn' onClick={openNewModal}>Create New Card</button>
      {isNewModalOpen && <NewModal closeModal={closeNewModal} positions={positions} />}
      <div className='laeknar-container'>
        {error && <p>{error}</p>}
        {position?.map((pos) => {
          const staff = pos.staff;
          return (
            <div key={pos.id}>
              <h1 className='laeknar-h1'>{pos.name}</h1>
              <div className='cards'>
                {staff?.map((person) => {
                  return (
                    <div className='edit-content' key={person.id}>
                      <div className='individual-cards'>
                        <div className='btn-container'>
                          <button className='edit-cards' onClick={() => openModalp(person.id)}>Edit</button>
                          <button className='delete-btn' onClick={() => handleDeleteCard(person.id)}>Delete</button>
                        </div>
                        <img className='card-img' src={person.image || undefined} alt='doctor' />
                        <p className='doctors-p'>{person.doctor}</p>
                        <p className='doctors-p'>{person.position}</p>
                        {isModalOpenp === person.id && <PersonModal closeModal={closeModalp} tableName='staff' id={person.id} />}
                      </div>
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
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default DoctorsPage;
