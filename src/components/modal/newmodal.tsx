import React, { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import './stylemodal.css';

interface NewModalProps {
  closeModal: () => void;
  positions: { id: number, name: string }[];
}

const NewModal: React.FC<NewModalProps> = ({ closeModal, positions }) => {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    image: '',
    position_id: '', // Updated to match the column name
    education1: '',
    education2: '',
    education3: '',
    education4: '',
    experience1: '',
    experience2: '',
    experience3: '',
    experience4: '',
    type: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);

    const formDataToSubmit = { ...formData, position_id: formData.position_id ? Number(formData.position_id) : null };

    const { error } = await supabase
      .from('staff')
      .insert([formDataToSubmit]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully');
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='edit-text-h2'>Create New Card</h2>
        <textarea
          className='title-textarea'
          name="name"
          placeholder="Nafn"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="doctor"
          placeholder="Læknir"
          value={formData.doctor}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="image"
          placeholder="Mynd URL"
          value={formData.image}
          onChange={handleChange}
        />
        <select
          className='title-input'
          name="position_id"
          value={formData.position_id}
          onChange={handleChange}
        >
          <option value="">Select Position</option>
          {positions.map(position => (
            <option key={position.id} value={position.id}>{position.name}</option>
          ))}
        </select>
        <textarea
          className='title-textarea'
          name="education1"
          placeholder="Menntun1"
          value={formData.education1}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education2"
          placeholder="Menntun2"
          value={formData.education2}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education3"
          placeholder="Menntun3"
          value={formData.education3}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education4"
          placeholder="Menntun4"
          value={formData.education4}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience1"
          placeholder="Reynsla1"
          value={formData.experience1}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience2"
          placeholder="Reynsla2"
          value={formData.experience2}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience3"
          placeholder="Reynsla3"
          value={formData.experience3}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience4"
          placeholder="Reynsla4"
          value={formData.experience4}
          onChange={handleChange}
        />
        <button className='save-btn' onClick={handleSubmit}>Submit</button>
        <button className='cancel-btn' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default NewModal;
