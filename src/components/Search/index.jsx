import React, { useState } from 'react';
import { IoSearch, IoClose } from "react-icons/io5";

const SearchInput = ({ placeholder , onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className={`
        relative flex items-center h-10
        bg-white border border-gray-200 rounded-full
        transition-all duration-200 ease-in-out
        ${isFocused 
          ? 'border-gray-300 shadow-lg ring-2 ring-gray-200' 
          : 'hover:border-gray-200 shadow-sm'
        }
      `}>
        {/* Search Icon */}
        <div className="absolute left-3 pointer-events-none">
          <IoSearch 
            className={`text-lg text-gray-300 transition-colors duration-200 ${
              isFocused ? 'text-gray-200' : ''
            }`}
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none"
          >
            <IoClose className="text-base" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;