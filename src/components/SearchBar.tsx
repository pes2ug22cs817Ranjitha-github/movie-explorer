'use client';

import React, { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search movies..."
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
      />
    </div>
  );
}
