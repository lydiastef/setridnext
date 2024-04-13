import React, { useState } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';


interface InfoModalProps {
  closeModal: () => void;
  tableName?: string;
  what?: string;
}

const TitleModal: React.FC<InfoModalProps> = ({ closeModal, tableName, what }) => {
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
        <h2 className='edit-text-h2'>Uppfæra texta</h2>
        <textarea className='title-textarea'
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
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

export default TitleModal;