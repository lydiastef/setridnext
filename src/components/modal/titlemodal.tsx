import React, { useState } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';


interface TitleModalProps {
  closeModal: () => void;
  tableName?: string;
  what?: string;
}

const TitleModal: React.FC<TitleModalProps> = ({ closeModal, tableName, what }) => {
  const [newText, setNewText] = useState('');
  if(!tableName) return
  const handleSave = async () => {
    const { error } = await supabase
    .from(tableName)
    .update({ value: newText })
    .eq('name', what)
    location.reload()
    // Logic to save the new text
    console.log('New text:', newText);

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='edit-text-h2'>Edit Text</h2>
        <textarea className='title-textarea'
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Enter new text..."
        />

        <div>
          <button className='save-btn' onClick={handleSave}>Save</button>
          <button className='cancel-btn' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TitleModal;

/*The closeModal function is a prop (prperties) because its function is passed between 
      a parent and a child component (Page and Titlemodal). The function of openModal 
      is not passed between parent and child and is therefore not a prop.*/
//The 'page' component is a parent to the 'TitleModal' component
//The buttons (save and cancel) can be considered children