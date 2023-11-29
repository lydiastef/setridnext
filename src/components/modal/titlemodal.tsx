import React, { useState } from 'react';
import './stylemodal.css';

interface TitleModalProps {
  closeModal: () => void;
}

const TitleModal: React.FC<TitleModalProps> = ({ closeModal }) => {
  const [newText, setNewText] = useState('');

  const handleSave = () => {
    // Logic to save the new text (you can use an API call or any state management approach)
    // For simplicity, let's just log the new text to the console in this example.
    console.log('New text:', newText);

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Text</h2>
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
