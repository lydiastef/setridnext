import React, { useState, useEffect } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';

interface PersonModalProps {
  closeModal: () => void;
  tableName: string;
  id: number;
}

const PersonModal: React.FC<PersonModalProps> = ({ closeModal, tableName, id }) => {
  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [image, setImage] = useState('');
  const [position, setPosition] = useState('');
  const [education1, setEducation1] = useState('');
  const [education2, setEducation2] = useState('');
  const [education3, setEducation3] = useState('');
  const [education4, setEducation4] = useState('');
  const [experience1, setExperience1] = useState('');
  const [experience2, setExperience2] = useState('');
  const [experience3, setExperience3] = useState('');
  const [experience4, setExperience4] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setName(data.name || '');
        setDoctor(data.doctor || '');
        setImage(data.image || '');
        setPosition(data.position_id || ''); // Update to use position_id
        setEducation1(data.education1 || '');
        setEducation2(data.education2 || '');
        setEducation3(data.education3 || '');
        setEducation4(data.education4 || '');
        setExperience1(data.experience1 || '');
        setExperience2(data.experience2 || '');
        setExperience3(data.experience3 || '');
        setExperience4(data.experience4 || '');
      }
    };

    fetchData();
  }, [tableName, id]);

  const handleSave = async () => {
    const { error } = await supabase
      .from(tableName)
      .update({
        name,
        doctor,
        image,
        position_id: position, // Update to position_id
        education1,
        education2,
        education3,
        education4,
        experience1,
        experience2,
        experience3,
        experience4,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating data:', error);
    } else {
      closeModal();
      window.location.reload(); // Reload the page to reflect changes
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <textarea
          className='title-textarea'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nafn"
        />
        <textarea
          className='title-textarea'
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          placeholder="Læknir"
        />
        <textarea
          className='title-textarea'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Mynd URL"
        />
        <input
          className='title-input'
          type="text"
          name="position"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <textarea
          className='title-textarea'
          value={education1}
          onChange={(e) => setEducation1(e.target.value)}
          placeholder="Menntun1"
        />
        <textarea
          className='title-textarea'
          value={education2}
          onChange={(e) => setEducation2(e.target.value)}
          placeholder="Menntun2"
        />
        <textarea
          className='title-textarea'
          value={education3}
          onChange={(e) => setEducation3(e.target.value)}
          placeholder="Menntun3"
        />
        <textarea
          className='title-textarea'
          value={education4}
          onChange={(e) => setEducation4(e.target.value)}
          placeholder="Menntun4"
        />
        <textarea
          className='title-textarea'
          value={experience1}
          onChange={(e) => setExperience1(e.target.value)}
          placeholder="Reynsla1"
        />
        <textarea
          className='title-textarea'
          value={experience2}
          onChange={(e) => setExperience2(e.target.value)}
          placeholder="Reynsla2"
        />
        <textarea
          className='title-textarea'
          value={experience3}
          onChange={(e) => setExperience3(e.target.value)}
          placeholder="Reynsla3"
        />
        <textarea
          className='title-textarea'
          value={experience4}
          onChange={(e) => setExperience4(e.target.value)}
          placeholder="Reynsla4"
        />
        <button className='save-btn' onClick={handleSave}>Submit</button>
        <button className='cancel-btn' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default PersonModal;
