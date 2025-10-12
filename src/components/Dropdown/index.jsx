import { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Dropdown = ({ options, selected, onSelect, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    if (option.disabled) return;
    
    if (onSelect) onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64">
      {/* Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-200 ${
          disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-100' 
            : 'hover:border-gray-300 cursor-pointer'
        }`}
      >
        <span className="text-gray-600">{selected}</span>
        <RiArrowDropDownLine
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              disabled={option.disabled}
              className={`w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors ${
                option.disabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                  : 'hover:bg-gray-50 text-gray-600 cursor-pointer'
              }`}
            >
              {option.label}
              {option.disabled && (
                <span className="ml-2 text-xs text-red-500">(Đã kín)</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;