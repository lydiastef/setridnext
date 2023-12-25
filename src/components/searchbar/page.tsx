import React, { useState } from 'react';
import './style.css';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    // Add logic to filter and display content based on searchTerm
    const contentElements = document.querySelectorAll('.searchable-content');
    contentElements.forEach((element) => {
      const contentText = (element.textContent || '').toLowerCase();
      const isVisible = contentText.includes(searchTerm.toLowerCase());
      (element as HTMLElement).style.display = isVisible ? 'block' : 'none';
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Leita..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
