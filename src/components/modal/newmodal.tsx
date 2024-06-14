import { useState } from 'react';
import './stylemodal.css';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import supabase from '../../config/supabaseClient';

interface NewModalProps {
    closeModal: () => void;
  }

const NewModal: React.FC<NewModalProps> = ({ closeModal }) => {
const supabase = createClientComponentClient();
const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    image: '',
    position: '',
    education1: '',
    education2: '',
    education3: '',
    education4: '',
    experience1: '',
    experience2: '',
    experience3: '',
    type: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'position' ? value : value });
  };

  const handleSubmit = async () => {
    const formDataToSubmit = { ...formData, position: Number(formData.position) };

    const { error } = await supabase
      .from('staff')
      .insert([formData]);

    if (error) {
      console.error(error);
    } else {
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
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="image"
          placeholder="Mynd URL"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className='title-input'
          type="number"
          name="position"
          placeholder="Númer á læknategund (1 = blóðlæknir, 2 = gigtlæknir, 3 = hjarta, 4 = innkirtla, 5 = krabbameins, 6 = lungna, 7 = nýrna, 8 = tauga, 9 = sálfr, 10 = annað starfsfólk)"
          value={formData.position}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education1"
          placeholder="Menntun1"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education2"
          placeholder="Menntun2"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education3"
          placeholder="Menntun3"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="education4"
          placeholder="Menntun4"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience1"
          placeholder="Reynsla1"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience2"
          placeholder="Reynsla2"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience3"
          placeholder="Reynsla3"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className='title-textarea'
          name="experience4"
          placeholder="Reynsla4"
          value={formData.name}
          onChange={handleChange}
        />
        <button className='save-btn' onClick={handleSubmit}>Submit</button>
        <button className='cancel-btn' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default NewModal;
