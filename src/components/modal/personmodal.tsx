import React, { useState } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';


interface PersonModalProps {
  closeModal: () => void;
  tableName?: string;
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

  if(!tableName) return
  const handleSave = async () => {
    const { error } = await supabase
    .from(tableName)
    .update({ name, doctor, image, position, education1, education2, education3, education4, experience1, experience2, experience3, experience4 })
    .eq('id', id)
    location.reload()
    // Logic to save the new text

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <textarea className='title-textarea'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nafn"
        />
        <textarea className='title-textarea'
          value={image}
          onChange={(e) => setDoctor(e.target.value)}
          placeholder="Læknir"
        />
        <textarea className='title-textarea'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Mynd URL"
        />
        <input
          className='title-input'
          type="number"
          name="position"
          placeholder="Númer á læknategund (1 = blóðlæknir, 2 = gigtlæknir, 3 = hjarta, 4 = innkirtla, 5 = krabbameins, 6 = lungna, 7 = nýrna, 8 = tauga, 9 = sálfr, 10 = annað starfsfólk)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <textarea className='title-textarea'
          value={education1}
          onChange={(e) => setEducation1(e.target.value)}
          placeholder="Menntun1"
        />
        <textarea className='title-textarea'
          value={education2}
          onChange={(e) => setEducation2(e.target.value)}
          placeholder="Menntun2"
        />
        <textarea className='title-textarea'
          value={education3}
          onChange={(e) => setEducation3(e.target.value)}
          placeholder="Menntu3"
        />
        <textarea className='title-textarea'
          value={education4}
          onChange={(e) => setEducation4(e.target.value)}
          placeholder="Menntu4"
        />
        <textarea className='title-textarea'
          value={experience1}
          onChange={(e) => setExperience1(e.target.value)}
          placeholder="Reynsl1"
        />
        <textarea className='title-textarea'
          value={experience2}
          onChange={(e) => setExperience2(e.target.value)}
          placeholder="Reynsla2"
        />
        <textarea className='title-textarea'
          value={experience3}
          onChange={(e) => setExperience3(e.target.value)}
          placeholder="Reynsla3"
        />
        <textarea className='title-textarea'
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

/*The closeModal function is a prop (prperties) because its function is passed between 
      a parent and a child component (Page and Titlemodal). The function of openModal 
      is not passed between parent and child and is therefore not a prop.*/
//The 'page' component is a parent to the 'TitleModal' component
//The buttons (save and cancel) can be considered children