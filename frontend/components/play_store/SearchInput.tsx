'use client';

import { Search, X } from 'lucide-react';
import { RefObject } from 'react';

type Props = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function SearchInput({ query, onChange, onClear, inputRef }: Props) {
  return (
    <div className="relative mb-6">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <Search className="ml-3 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Search for apps..."
          className="w-full p-3 outline-none"
        />
        {query && (
          <button onClick={onClear} className="mr-3 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
