"use client"
import React from 'react';

const SearchSec = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full flex items-center justify-center gap-[10px] mb-4">
      
      <input
        type="text"
        placeholder="Search for products..."
        onChange={handleInputChange}
        className="border p-2 rounded-md  w-[50%]"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchSec;
