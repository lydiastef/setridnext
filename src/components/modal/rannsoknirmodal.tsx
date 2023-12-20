import React, { useState } from 'react';
import './stylemodal.css';
import supabase from '../../config/supabaseClient';


interface RCardsModalProps {
  closeModal: () => void;
  tableName?: string;
  id: number;
}

const RCardsModal: React.FC<RCardsModalProps> = ({ closeModal, tableName, id }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  if(!tableName) return
  const handleSave = async () => {
    const { error } = await supabase
    .from(tableName)
    .update({ name, image, description })
    .eq('id', id)
    location.reload()
    // Logic to save the new text

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='edit-text-h2'>Edit Name</h2>
        <textarea className='title-textarea'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new text..."
        />

<h2 className='edit-text-h2'>Edit Image</h2>
        <textarea className='title-textarea'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter new text..."
        />

<h2 className='edit-text-h2'>Edit Description</h2>
        <textarea className='title-textarea'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default RCardsModal;

/*The closeModal function is a prop (prperties) because its function is passed between 
      a parent and a child component (Page and Titlemodal). The function of openModal 
      is not passed between parent and child and is therefore not a prop.*/
//The 'page' component is a parent to the 'TitleModal' component
//The buttons (save and cancel) can be considered children