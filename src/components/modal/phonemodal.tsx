import React, { useState } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';


interface PhoneModalProps {
  closeModal: () => void;
  tableName?: string;
  id: number;
}

const PhoneModal: React.FC<PhoneModalProps> = ({ closeModal, tableName, id }) => {
  const [number, setNumber] = useState('');
  const [days, setDays] = useState('');
  const [friday, setFriday] = useState('');
  if(!tableName) return
  const handleSave = async () => {
    const { error } = await supabase
    .from(tableName)
    .update({ number, days, friday })
    .eq('id', id)
    location.reload()
    // Logic to save the new text

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='edit-text-h2'>Símanúmer</h2>
        <textarea className='title-textarea'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Nýr texti..."
        />

<h2 className='edit-text-h2'>Mán-fim</h2>
        <textarea className='title-textarea'
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Nýr texti..."
        />

<h2 className='edit-text-h2'>Föstudagar</h2>
        <textarea className='title-textarea'
          value={friday}
          onChange={(e) => setFriday(e.target.value)}
          placeholder="Nýr texti..."
        />

        <div className='btns'>
          <button className='save-btn' onClick={handleSave}>Vista</button>
          <button className='cancel-btn' onClick={closeModal}>Hætta</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;

/*The closeModal function is a prop (prperties) because its function is passed between 
      a parent and a child component (Page and Titlemodal). The function of openModal 
      is not passed between parent and child and is therefore not a prop.*/
//The 'page' component is a parent to the 'TitleModal' component
//The buttons (save and cancel) can be considered children