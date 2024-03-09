import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import supabase from '../../config/supabaseClient';
import Link from 'next/link';

type Staff = {
  created_at: string;
  id: number;
  name: string | null;
  doctor: string | null;
  image: string | null;
  position: string | null;
  education1: string | null;
  education2: string | null;
  education3: string | null;
  education4: string | null;
  experience1: string | null;
  experience2: string | null;
  experience3: string | null;
  type: string | null;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Start of event listener to close searchbar on click
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Add event listener to close suggestion dropdown on click outside
    function handleClickOutside(event: MouseEvent) {
      if (
        !searchIconRef.current?.contains(event.target as Node) && // Check if clicked outside the search icon
        !inputRef.current?.contains(event.target as Node) && // Check if clicked outside the input field
        !dropdownRef.current?.contains(event.target as Node) // Check if clicked outside the dropdown
      ) {
        setIsSearchBarOpen(false); // Close the search bar
        setShowSuggestions(false); // Close the dropdown
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // End of event listener to close drop down suggestions on click


  const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    setShowSuggestions(query.length >= 3); // Show suggestions when query length is >= 3
    debouncedSearch(query);
  };

  const debouncedSearch = debounce(async (query) => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select()
        .ilike('doctor', `%${query}%`);
        
        /*const { data2, error2 } = await supabase
        .from('')
        .select()
        .ilike('doctor', `%${query}%`);*/
      if (error) {
        throw error;
      }

      setSearchResults([data] as {}[]); //add data2 when another table is added (rannsóknir)
    } catch (error) {
      console.error('Error searching staff:', (error as Error).message);
      setSearchResults([]);
    }
  }, 300);

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    if (!isSearchBarOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  //Click result link
  const handleResultClick = (result: Staff) => {
    console.log(`Clicked on result: ${result.name}`);
  };
  

  return (
    <div className="search-container">
      <div ref={searchIconRef} className={`search-icon ${isSearchBarOpen ? 'hidden' : ''}`} onClick={toggleSearchBar}>
        <img className='search' src="/search.png" alt="Search" />
      </div>
      {isSearchBarOpen && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Leita..."
          value={searchTerm}
          onChange={handleSearch}
         className="search-bar"
       />
      )}
      {showSuggestions && searchResults.length > 0 && ( // Only display suggestions if showSuggestions is true and there are results
        <div ref={dropdownRef} className="suggestions-dropdown">
        {searchResults.map((result, index) => (
          <div key={index} className="suggestion">
          <Link href={`/laeknar#${result.doctor}`} className="staff-link" onClick={() => handleResultClick(result)}>              
            <h3 className='dropdown-h3'>{result.doctor}</h3>
          </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

