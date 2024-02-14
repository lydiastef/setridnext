import React, { useState } from 'react';
import './style.css';
import supabase from '../../config/supabaseClient';

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
  const [searchResults, setSearchResults] = useState<Staff[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    if (query.length >= 3) {
      setShowSuggestions(true); // Show suggestions when query length is >= 3
    } else {
      setShowSuggestions(false); // Hide suggestions when query length is < 3
    }
    debouncedSearch(query);
  };

  const debouncedSearch = debounce(async (query) => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('name')
        .textSearch('name', query, {
          type: 'websearch',
          config: 'english',
        });

      if (error) {
        throw error;
      }

      setSearchResults(data as Staff[]);
      setShowSuggestions(true); // Set showSuggestions to true when there are results
    } catch (error) {
      console.error('Error searching staff:', (error as Error).message);
      setSearchResults([]);
      setShowSuggestions(false); // Set showSuggestions to false when there are no results
    }
  }, 100);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      {showSuggestions && searchResults.length > 0 && ( // Only display suggestions if showSuggestions is true and there are results
        <div className="suggestions-dropdown">
          {searchResults.map((result, index) => (
            <div key={index} className="suggestion">
              <a href={`/staff/${result.id}`} className="staff-link">
                <h3>{result.name}</h3>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

