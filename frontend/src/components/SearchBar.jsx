import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';

const SearchBar = ({ onSearch, placeholder = "Rechercher un artisan..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Effacer"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;