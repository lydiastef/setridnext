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
  const [image, setImage] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  if(!tableName) return
  const handleSave = async () => {
    const { error } = await supabase
    .from(tableName)
    .update({ name, image, education, experience })
    .eq('id', id)
    location.reload()
    // Logic to save the new text

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='edit-text-h2'>Nafn</h2>
        <textarea className='title-textarea'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nýr texti..."
        />

<h2 className='edit-text-h2'>Mynd</h2>
        <textarea className='title-textarea'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Nýr texti..."
        />

<h2 className='edit-text-h2'>Menntun</h2>
        <textarea className='title-textarea'
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="Nýr texti..."
        />

<h2 className='edit-text-h2'>Reynsla</h2>
        <textarea className='title-textarea'
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Nýr texti..."
        />

        <div className='btns'>
          <button className='cancel-btn' onClick={closeModal}>Hætta</button>
          <button className='save-btn' onClick={handleSave}>Vista</button>
        </div>
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