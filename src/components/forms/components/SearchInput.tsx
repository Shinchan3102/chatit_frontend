import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps {
  onSearch: (query: string) => void;
  delay?: number; // Optional delay prop for debouncing
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, delay = 500 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
      }
      setIsTyping(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch, delay]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); // Optionally trigger search with an empty value to reset the results
  };

  return (
    <div className="relative flex flex-1 items-center">
      <Input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsTyping(true);
        }}
        placeholder="Search sessions..."
        className="pr-10"
      />
      {searchTerm && (
        <button onClick={handleClear} className="absolute right-8">
          <FiX className="text-gray-400" size={18} />
        </button>
      )}
      <FiSearch className="absolute right-2 text-gray-400" size={18} />
    </div>
  );
};

export default SearchInput;
